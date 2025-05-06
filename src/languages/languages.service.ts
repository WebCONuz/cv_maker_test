import { Injectable } from "@nestjs/common";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Language } from "./model/language.model";

@Injectable()
export class LanguagesService {
  constructor(
    @InjectModel(Language) private readonly languageModel: typeof Language
  ) {}
  create(createLanguageDto: CreateLanguageDto) {
    return this.languageModel.create(createLanguageDto);
  }

  findAll() {
    return this.languageModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.languageModel.findByPk(id);
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return this.languageModel.update(updateLanguageDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.languageModel.destroy({ where: { id } });
  }
}
