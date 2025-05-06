import { Injectable } from "@nestjs/common";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Skill } from "./models/skill.model";

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill) private readonly skillModel: typeof Skill) {}
  create(createSkillDto: CreateSkillDto) {
    return this.skillModel.create(createSkillDto);
  }

  findAll() {
    return this.skillModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.skillModel.findByPk(id);
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return this.skillModel.update(updateSkillDto, { where: { id } });
  }

  remove(id: number) {
    return this.skillModel.destroy({ where: { id } });
  }
}
