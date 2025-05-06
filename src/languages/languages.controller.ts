import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Languages") // Swagger'da bo'lim nomi
@Controller("languages")
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi til qo'shish" })
  @ApiResponse({ status: 201, description: "Til muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Validatsiya xatosi" })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha tillarni olish" })
  @ApiResponse({ status: 200, description: "Tillar ro'yxati qaytarildi" })
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali tilni olish" })
  @ApiResponse({ status: 200, description: "Til topildi" })
  @ApiResponse({ status: 404, description: "Til topilmadi" })
  findOne(@Param("id") id: string) {
    return this.languagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Til ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Til muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Til topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tilni o'chirish" })
  @ApiResponse({ status: 200, description: "Til o'chirildi" })
  @ApiResponse({ status: 404, description: "Til topilmadi" })
  remove(@Param("id") id: string) {
    return this.languagesService.remove(+id);
  }
}
