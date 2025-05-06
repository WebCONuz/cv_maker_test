import { Injectable } from "@nestjs/common";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Education } from "./models/education.model";

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education) private readonly educationModel: typeof Education
  ) {}
  create(createEducationDto: CreateEducationDto) {
    return this.educationModel.create(createEducationDto);
  }

  findAll() {
    return this.educationModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.educationModel.findByPk(id);
  }

  update(id: number, updateEducationDto: UpdateEducationDto) {
    return this.educationModel.update(updateEducationDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.educationModel.destroy({ where: { id } });
  }
}
