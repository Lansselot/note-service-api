import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { mailTransporter } from '../clients/nodemailer.client';
import { SendEmailDTO } from '../types/dto/email.dto';

export class EmailService {
  async sendEmail({
    to,
    subject,
    text,
  }: SendEmailDTO): Promise<SMTPTransport.SentMessageInfo> {
    return mailTransporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.GOOGLE_EMAIL}>`,
      to,
      subject,
      text,
    });
  }
}
