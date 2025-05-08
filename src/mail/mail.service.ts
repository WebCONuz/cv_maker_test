import { Injectable } from "@nestjs/common";
import { User } from "../users/models/user.model";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to cv-maker app",
      template: "confirm",
      context: {
        first_name: user.first_name,
        link: `${process.env.DOMEN}/api/auth/activate/${user.activate_link}`,
      },
    });
  }
}
