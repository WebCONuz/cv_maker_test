import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { Role } from "../roles/models/role.model";
import { JwtModule } from "@nestjs/jwt";
import { FileModule } from "../file/file.module";
import { MediaModule } from "../media/media.module";
import { Media } from "../media/models/media.model";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Media]),
    Role,
    JwtModule,
    FileModule,
    MediaModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
