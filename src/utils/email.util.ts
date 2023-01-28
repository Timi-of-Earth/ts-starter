import nodemailer from 'nodemailer'

import env from '../env.config';

class Email {
  private readonly from: string = `Testing <${env.EMAIL_FROM}>`;

  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: env.USER,
        pass: env.USER_PASSWORD,
      },
      // secure: true,
      //   tls: {
      //     rejectUnauthorized: false,
      //   },
      //   logger: true,
    });
  }

  //Send the actual email
  async send(user: any, subject: string, data: string) {
    //Define the email options
    const mailOptions = {
      from: this.from,
      to: user.email,
      subject,
      html: '<h1>hello world</h1>',
      text: data,
    };

    //Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(user: any) {
    await this.send(user, 'welcome', 'Welcome to the Kerapay!');
  }

  async sendPasswordReset(data: string, user: any) {
    await this.send(
      user,
      'Your password reset token. It expires after 10 minutes',
      data
    );
  }

  async sendOrderReceived(data: string, user: any) {
    await this.send(user, 'Thank you for your order', data);
  }

  async sendOrderReceivedAdmin(data: string, user: any) {
    await this.send(user, 'We have a new order!!', data);
  }
}

export default Email;
