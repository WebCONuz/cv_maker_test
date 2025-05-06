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
import { UserMessageModule } from "./user-message/user-message.module";
import { RelationsModule } from "./relations/relations.module";
import { LanguagesModule } from "./languages/languages.module";
import { SkillsModule } from "./skills/skills.module";
import { ExperienceModule } from "./experience/experience.module";
import { EducationModule } from "./education/education.module";
import { SocialMediaModule } from "./social_media/social_media.module";
import { Relation } from "./relations/models/relation.models";
import { Language } from "./languages/model/language.model";
import { Skill } from "./skills/models/skill.model";
import { UserMessage } from "./user-message/models/user-message.models";
import { Experience } from "./experience/models/experience.model";
import { Education } from "./education/models/education.model";
import { SocialMedia } from "./social_media/models/social_media.model";
import { Media } from "./media/models/media.model";

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
      models: [
        Role,
        User,
        Relation,
        Language,
        Skill,
        UserMessage,
        Experience,
        Education,
        SocialMedia,
        Media,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    RolesModule,
    UsersModule,
    UserMessageModule,
    AuthModule,
    MailModule,
    RelationsModule,
    LanguagesModule,
    SkillsModule,
    ExperienceModule,
    EducationModule,
    SocialMediaModule,
    SocialMediaModule,
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
