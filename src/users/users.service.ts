import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const hashshed_password = await bcrypt.hashSync(createUserDto.password, 7);
    return this.userModel.create({
      ...createUserDto,
      password: hashshed_password,
    });
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findByToken(refresh_token: string) {
    return this.userModel.findOne({ where: { refresh_token } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }
    await user.update(updateUserDto);
    console.log(user);
    return user[1][0];
  }

  async activate(link: string) {
    const updatedUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activate_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updatedUser[1][0]) {
      throw new BadRequestException("User allaqachon aktivatsiya qilgan");
    }
    return updatedUser[1][0];
  }

  async remove(id: number) {
    const user = await this.userModel.destroy({ where: { id } });
    if (user) {
      throw new NotFoundException("Foydalanuvchini o'chirishda xatolik");
    }
    return "Foydalanuvchi o'chirildi";
  }
}
