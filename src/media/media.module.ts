import { Module } from "@nestjs/common";
import { MediaService } from "./media.service";
import { MediaController } from "./media.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Media } from "./models/media.model";
import { FileModule } from "../file/file.module";
import { User } from "../users/models/user.model";

@Module({
  imports: [SequelizeModule.forFeature([Media, User]), FileModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
