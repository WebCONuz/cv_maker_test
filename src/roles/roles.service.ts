import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./models/role.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleModel: typeof Role) {}
  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  findAll() {
    return this.roleModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.roleModel.findByPk(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException("Role topilmadi");
    }
    await role.update(updateRoleDto);
    return role[1][0];
  }

  async remove(id: number) {
    const role = await this.roleModel.destroy({ where: { id } });
    if (role) {
      throw new BadRequestException("Rolni o'chirishda xatolik");
    }
    return "Rol o'chirildi";
  }
}
