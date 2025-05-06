import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, Min } from "class-validator";

export class CreateRelationDto {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining ID raqami (musbat butun son)",
  })
  @IsInt({ message: "user_id butun son bo'lishi kerak" })
  @Min(1, { message: "user_id 1 dan katta bo'lishi kerak" })
  user_id: number;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi aktivmi yoki yo'q",
    default: true,
  })
  @IsBoolean({
    message: "is_active faqat boolean qiymat (true/false) bo'lishi kerak",
  })
  is_active: boolean;
}
