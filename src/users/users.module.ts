import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { Role } from "../roles/models/role.model";

@Module({
  imports: [SequelizeModule.forFeature([User]), Role],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
