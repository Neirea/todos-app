import { User } from '../entities/user.entity';
import { TCreateUser, TJwtUser } from '../types/users.type';
import { comparePasswords, hashPassword, createJwt } from '../utils/auth.util';
import { createHash, generateToken } from '../utils/crypto.util';
import EmailService from './email.service';
import { CustomError } from '../errors/custom-error.util';

export default class UserService {
  constructor(private emailService: EmailService) {}

  async register(email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const token = generateToken();
    const newUser: TCreateUser = { email, password: hashedPassword, verification_token: token };
    const createUser = await User.insert(newUser);
    const sendEmail = this.sendVerificationEmail(email, token);
    await Promise.all([createUser, sendEmail]);
  }

  async verifyEmail(email: string, token: string) {
    const user = await User.findOneBy({ email });
    if (!user || user.verification_token !== token) {
      throw new CustomError('Verification failed');
    }
    user.is_verified = true;
    user.verification_token = '';
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw new CustomError('Login failed');
    }
    const isPasswordCorrect = await comparePasswords(password, user.password);
    if (!isPasswordCorrect || !user.is_verified) {
      throw new CustomError('Invalid credentials');
    }
    const jwtPayload: TJwtUser = { id: user.id, email: user.email };
    const token = createJwt({ payload: jwtPayload });
    return token;
  }

  async changePassword(email: string, password: string, newPassword: string) {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw new CustomError('Invalid user');
    }
    const isPasswordCorrect = await comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
      throw new CustomError('Invalid credentials');
    }
    user.password = await hashPassword(newPassword);
    user.save();
  }

  async forgotPassword(email: string) {
    const user = await User.findOneBy({ email });
    if (!user) return;
    const token = generateToken();
    const tenMinutes = 600_000;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.password_reset_token = createHash(token);
    user.password_reset_token_expires_at = passwordTokenExpirationDate;
    await user.save();
    await this.sendResetPasswordEmail(user.email, token);
  }

  async resetPassword(email: string, token: string, password: string) {
    const user = await User.findOneBy({ email });
    if (!user) return;
    const currentDate = new Date();
    if (
      user.password_reset_token !== createHash(token) ||
      user.password_reset_token_expires_at! < currentDate
    ) {
      throw new CustomError('Invalid token');
    }
    const newPassword = await hashPassword(password);
    user.password = newPassword;
    user.password_reset_token = null;
    user.password_reset_token_expires_at = null;
    await user.save();
  }

  private async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?email=${email}&token=${token}`;
    const link = `<a href=${verifyUrl}>Verify account</a>`;
    const message = `<p>Hello! Click the link to verify your account: ${link} </p>`;
    return this.emailService.sendEmail({
      to: email,
      subject: 'Verify email',
      html: message
    });
  }

  private async sendResetPasswordEmail(email: string, token: string) {
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?email=${email}&token=${token}`;
    const link = `<a href=${resetPasswordUrl}>Verify account</a>`;
    const message = `<p>Hello! Click the link to reset password: ${link} </p>`;
    return this.emailService.sendEmail({
      to: email,
      subject: 'Reset Password',
      html: message
    });
  }
}
