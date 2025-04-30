import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({
    example: "admin",
    description: "Rol nomi (masalan: admin, user, moderator)",
  })
  @IsString({ message: "name maydoni matn bo'lishi kerak" })
  @MinLength(3, { message: "name kamida 3 ta belgidan iborat bo'lishi kerak" })
  name: string;

  @ApiProperty({
    example: true,
    description: "Rol faol yoki yo'qligini bildiradi",
  })
  @IsBoolean({ message: "is_active qiymati true yoki false bo'lishi kerak" })
  @IsOptional()
  is_active: boolean;
}