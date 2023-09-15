import { SendMailOptions, createTransport, Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import { TTransportOptions } from '../types/email.type';

dotenv.config({ path: '.env.mail' });

export default class EmailService {
  transporter: Transporter;

  constructor(transportOptions: TTransportOptions) {
    this.transporter = createTransport(transportOptions);
  }

  async sendEmail({ to, subject, html }: SendMailOptions) {
    return this.transporter.sendMail({
      to,
      from: process.env.EMAIL_SENDER,
      subject,
      html
    });
  }
}
