import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Role } from "./models/role.model";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({
    summary: "Post new role",
  })
  @ApiCreatedResponse({ description: "yangi yaratilgan ma'lumot", type: Role })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOkResponse({ description: "Barcha rollar", type: [Role] })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOkResponse({ description: "Bitta rol" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(+id);
  }

  @ApiOkResponse({ description: "O'zgartirilgan rol" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiNoContentResponse({ description: "Rol o'chirildi", type: Role })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolesService.remove(+id);
  }
}
