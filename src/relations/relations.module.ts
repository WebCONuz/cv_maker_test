import { Module } from "@nestjs/common";
import { RelationsService } from "./relations.service";
import { RelationsController } from "./relations.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Relation } from "./models/relation.models";
import { User } from "../users/models/user.model";
import { Experience } from "../experience/models/experience.model";

@Module({
  imports: [SequelizeModule.forFeature([Relation]), User, Experience],
  controllers: [RelationsController],
  providers: [RelationsService],
})
export class RelationsModule {}
