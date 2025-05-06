import { Injectable } from "@nestjs/common";
import { CreateSocialMediaDto } from "./dto/create-social_media.dto";
import { UpdateSocialMediaDto } from "./dto/update-social_media.dto";
import { InjectModel } from "@nestjs/sequelize";
import { SocialMedia } from "./models/social_media.model";

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(SocialMedia)
    private readonly socialMediaModel: typeof SocialMedia
  ) {}
  create(createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaModel.create(createSocialMediaDto);
  }

  findAll() {
    return this.socialMediaModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.socialMediaModel.findByPk(id);
  }

  update(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
    return this.socialMediaModel.update(updateSocialMediaDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.socialMediaModel.destroy({ where: { id } });
  }
}
