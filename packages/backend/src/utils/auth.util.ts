import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

type TPayload = Record<string, any>;
const PASSWORD_SALT = 10;

export const hashPassword = (password: string) => bcrypt.hash(password, PASSWORD_SALT);

export const comparePasswords = async (passwordToCheck: string, hashedPassword: string) => {
  const isPasswordCorrect = await bcrypt.compare(passwordToCheck, hashedPassword);
  return isPasswordCorrect;
};

export const createJwt = ({ payload }: { payload: TPayload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });
  return token;
};
