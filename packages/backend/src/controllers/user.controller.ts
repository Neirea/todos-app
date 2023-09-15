import { Response, Request } from 'express';
import UserService from '../services/user.service';
import EmailService from '../services/email.service';
import { transportOptions } from '../config/email';

export class UserController {
  constructor(private userService: UserService) {}

  async getMe(req: Request, res: Response) {
    res.send(req.user);
  }

  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    await this.userService.register(email, password);
    res.send(true);
  }

  async verifyEmail(req: Request, res: Response) {
    const { token, email } = req.body;
    await this.userService.verifyEmail(email, token);
    res.send(true);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    res.send(token);
  }

  async changePassword(req: Request, res: Response) {
    const user = req.user!;
    const { password, newPassword } = req.body;
    await this.userService.changePassword(user.email, password, newPassword);
    res.send(true);
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    await this.userService.forgotPassword(email);
    res.send(true);
  }

  async resetPassword(req: Request, res: Response) {
    const { email, token, password } = req.body;
    await this.userService.resetPassword(email, token, password);
    res.send(true);
  }
}
const emailService = new EmailService(transportOptions);
const userController = new UserController(new UserService(emailService));
export default userController;
