import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
