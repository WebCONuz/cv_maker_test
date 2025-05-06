import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsIn,
  IsBoolean,
  IsNotEmpty,
  IsInt,
  Min,
} from "class-validator";

export class CreateLanguageDto {
  @ApiProperty({
    example: "English",
    description: "Foydalanuvchi biladigan til nomi",
  })
  @IsString({ message: "Til nomi matn ko'rinishida bo'lishi kerak" })
  @IsNotEmpty({ message: "Til nomi bo'sh bo'lishi mumkin emas" })
  language: string;

  @ApiProperty({
    example: "B2",
    description: "Til darajasi: A2, B1, B2 yoki C1 bo'lishi kerak",
    enum: ["A2", "B1", "B2", "C1"],
  })
  @IsIn(["A2", "B1", "B2", "C1"], {
    message: "degree faqat A2, B1, B2 yoki C1 bo'lishi mumkin",
  })
  @IsNotEmpty({ message: "degree maydoni to‘ldirilishi shart" })
  degree: "A2" | "C1" | "B1" | "B2";

  @ApiProperty({
    example: true,
    description: "Til faollik holati (true yoki false)",
  })
  @IsBoolean({
    message: "is_active qiymati faqat true yoki false bo'lishi kerak",
  })
  @IsNotEmpty({ message: "is_active maydoni bo'sh bo'lishi mumkin emas" })
  is_active: boolean;

  @ApiProperty({
    example: 2,
    description: "Relation jadvalidan foreign key (relation_id)",
  })
  @IsInt({ message: "relation_id butun son bo'lishi kerak" })
  @Min(1, { message: "relation_id kamida 1 bo'lishi kerak" })
  relation_id: number;
}
