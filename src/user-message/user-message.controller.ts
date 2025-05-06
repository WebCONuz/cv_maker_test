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
import { UserMessageService } from "./user-message.service";
import { CreateUserMessageDto } from "./dto/create-user-message.dto";
import { UpdateUserMessageDto } from "./dto/update-user-message.dto";

@ApiTags("UserMessage") // Swagger UI dagi kategoriya nomi
@Controller("user-message")
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Post()
  @ApiOperation({ summary: "Yangi foydalanuvchi xabarini yaratish" })
  @ApiResponse({ status: 201, description: "Xabar muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Xatolik: noto'g'ri ma'lumot" })
  create(@Body() createUserMessageDto: CreateUserMessageDto) {
    return this.userMessageService.create(createUserMessageDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchi xabarlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Xabarlar muvaffaqiyatli qaytarildi",
  })
  findAll() {
    return this.userMessageService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta xabarni olish" })
  @ApiResponse({ status: 200, description: "Xabar topildi" })
  @ApiResponse({ status: 404, description: "Xabar topilmadi" })
  findOne(@Param("id") id: string) {
    return this.userMessageService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xabarni yangilash" })
  @ApiResponse({ status: 200, description: "Xabar muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Xabar topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateUserMessageDto: UpdateUserMessageDto
  ) {
    return this.userMessageService.update(+id, updateUserMessageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xabarni o'chirish" })
  @ApiResponse({ status: 200, description: "Xabar muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Xabar topilmadi" })
  remove(@Param("id") id: string) {
    return this.userMessageService.remove(+id);
  }
}
