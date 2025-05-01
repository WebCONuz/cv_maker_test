import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [UsersModule, MailModule, JwtModule.register({})],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
