import { Module } from "@nestjs/common";
import { RolesModule } from "./roles/roles.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./roles/models/role.model";
import { User } from "./users/models/user.model";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { BotModule } from "./bot/bot.module";
import { TelegrafModule } from "nestjs-telegraf";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: "cv_maker",
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN!,
        include: [BotModule],
        middlewares: [],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_POTR),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Role, User],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    MailModule,
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
