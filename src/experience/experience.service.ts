import { Injectable } from "@nestjs/common";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { UpdateExperienceDto } from "./dto/update-experience.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Experience } from "./models/experience.model";
import { read } from "fs";

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience) private readonly experienceModel: typeof Experience
  ) {}
  create(createExperienceDto: CreateExperienceDto) {
    return this.experienceModel.create(createExperienceDto);
  }

  findAll() {
    return this.experienceModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.experienceModel.findByPk(id);
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return this.experienceModel.update(updateExperienceDto, { where: { id } });
  }

  remove(id: number) {
    return this.experienceModel.destroy({ where: { id } });
  }
}
