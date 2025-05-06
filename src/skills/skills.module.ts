import { Module } from "@nestjs/common";
import { SkillsService } from "./skills.service";
import { SkillsController } from "./skills.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Skill } from "./models/skill.model";
import { Relation } from "../relations/models/relation.models";

@Module({
  imports: [SequelizeModule.forFeature([Skill]), Relation],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
