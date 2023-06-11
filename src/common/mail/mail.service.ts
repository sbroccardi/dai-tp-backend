import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPassword(fullName: string, email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@screenspace.com.ar>', // override default from
      subject: '🍿 SpaceApp 🎬 - Reset Password',
      template: './resetPassword', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: fullName,
        token,
      },
    });
  }
}
