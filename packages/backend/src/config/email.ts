import dotenv from 'dotenv';

dotenv.config({ path: '.env.email' });

export const transportOptions = {
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '', 10),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};
