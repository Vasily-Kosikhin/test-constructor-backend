import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

class MailService {
  constructor() {
    this.transpoter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }
  async sendActivationMail(to, link) {
    await this.transpoter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      test: '',
      html: `
       <div><h1>Для активацияя перейдите по ссылке</h1><a href="${link}">${link}</a></div>
      `
    });
  }

  async sendPasswordRecoveryMail(to, link) {
    await this.transpoter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Восстановление пароля на ` + process.env.API_URL,
      test: '',
      html: `
       <div><h1>Для сброса пароля перейдите по ссылке</h1><a href="${link}">${link}</a></div>
      `
    });
  }
}

export default new MailService();
