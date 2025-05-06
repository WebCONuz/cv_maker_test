import { Injectable } from "@nestjs/common";
import { CreateRelationDto } from "./dto/create-relation.dto";
import { UpdateRelationDto } from "./dto/update-relation.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Relation } from "./models/relation.models";

@Injectable()
export class RelationsService {
  constructor(
    @InjectModel(Relation) private readonly relationModel: typeof Relation
  ) {}
  create(createRelationDto: CreateRelationDto) {
    return this.relationModel.create(createRelationDto);
  }

  findAll() {
    return this.relationModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.relationModel.findByPk(id);
  }

  update(id: number, updateRelationDto: UpdateRelationDto) {
    return this.relationModel.update(updateRelationDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.relationModel.destroy({ where: { id } });
  }
}
