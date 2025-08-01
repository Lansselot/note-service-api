import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});
