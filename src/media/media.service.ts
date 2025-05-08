import { Injectable } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Media } from "./models/media.model";
import { FileService } from "../file/file.service";

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media) private readonly mediaModel: typeof Media,
    private readonly fileService: FileService
  ) {}

  async create(file: any, is_active: boolean = true) {
    const fileName = file ? await this.fileService.saveImage(file) : "";
    const media = await this.mediaModel.create({
      media_name: fileName,
      is_active,
    });

    return media.id;
  }

  findAll() {
    return this.mediaModel.findAll();
  }

  findOne(id: number) {
    return this.mediaModel.findByPk(id);
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.mediaModel.update(updateMediaDto, { where: { id } });
  }

  remove(id: number) {
    return this.mediaModel.destroy({ where: { id } });
  }
}
