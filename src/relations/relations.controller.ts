import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RelationsService } from "./relations.service";
import { CreateRelationDto } from "./dto/create-relation.dto";
import { UpdateRelationDto } from "./dto/update-relation.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Relations") // Swagger bo'lim nomi
@Controller("relations")
export class RelationsController {
  constructor(private readonly relationsService: RelationsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi relation yaratish" })
  @ApiResponse({ status: 201, description: "Relation yaratildi" })
  @ApiResponse({ status: 400, description: "Notog'ri maʼlumot" })
  create(@Body() createRelationDto: CreateRelationDto) {
    return this.relationsService.create(createRelationDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha relationlarni olish" })
  @ApiResponse({ status: 200, description: "Relationlar ro'yxati" })
  findAll() {
    return this.relationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta relationni olish" })
  @ApiResponse({ status: 200, description: "Relation topildi" })
  @ApiResponse({ status: 404, description: "Relation topilmadi" })
  findOne(@Param("id") id: string) {
    return this.relationsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Relationni yangilash" })
  @ApiResponse({ status: 200, description: "Relation yangilandi" })
  @ApiResponse({ status: 404, description: "Relation topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateRelationDto: UpdateRelationDto
  ) {
    return this.relationsService.update(+id, updateRelationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Relationni o'chirish" })
  @ApiResponse({ status: 200, description: "Relation o'chirildi" })
  @ApiResponse({ status: 404, description: "Relation topilmadi" })
  remove(@Param("id") id: string) {
    return this.relationsService.remove(+id);
  }
}
