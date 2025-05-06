import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SkillsService } from "./skills.service";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";

@ApiTags("Skills") // Swagger uchun "Skills" kategoriya nomi
@Controller("skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi ko'nikma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Ko'nikma muvaffaqiyatli yaratildi",
  })
  @ApiResponse({ status: 400, description: "Yaratishda xatolik" })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha ko'nikmalarni ko'rish" })
  @ApiResponse({ status: 200, description: "Barcha ko'nikmalar qaytarildi" })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha ko'nikma ma'lumotlarini ko'rish" })
  @ApiResponse({ status: 200, description: "Ko'nikma topildi" })
  @ApiResponse({ status: 404, description: "Ko'nikma topilmadi" })
  findOne(@Param("id") id: string) {
    return this.skillsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Ko'nikmani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Ko'nikma muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Ko'nikma topilmadi" })
  update(@Param("id") id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Ko'nikmani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Ko'nikma muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Ko'nikma topilmadi" })
  remove(@Param("id") id: string) {
    return this.skillsService.remove(+id);
  }
}
