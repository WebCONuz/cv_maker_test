import { Module } from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { LanguagesController } from "./languages.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Language } from "./model/language.model";
import { Relation } from "../relations/models/relation.models";

@Module({
  imports: [SequelizeModule.forFeature([Language]), Relation],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
