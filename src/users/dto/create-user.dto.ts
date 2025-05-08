import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateUserDto {
  @ApiProperty({
    example: "Ali",
    description: "Foydalanuvchining ismi",
  })
  @IsString({ message: "first_name matn bo'lishi kerak" })
  @MinLength(2, {
    message: "first_name kamida 2 ta belgidan iborat bo'lishi kerak",
  })
  first_name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "Foydalanuvchining familiyasi",
  })
  @IsString({ message: "last_name matn bo'lishi kerak" })
  @MinLength(2, {
    message: "last_name kamida 2 ta belgidan iborat bo'lishi kerak",
  })
  last_name: string;

  @ApiProperty({
    example: "Yunusobod 4-daha, 12-uy",
    description: "Foydalanuvchining manzili",
  })
  @IsString({ message: "address matn bo'lishi kerak" })
  @IsNotEmpty({ message: "address bo'sh bo'lmasligi kerak" })
  address: string;

  @ApiProperty({
    example: "Tashkent",
    description: "Shahar nomi",
  })
  @IsString({ message: "city matn bo'lishi kerak" })
  @IsNotEmpty({ message: "city bo'sh bo'lmasligi kerak" })
  city: string;

  @ApiProperty({
    example: "100200",
    description: "Pochta indeksi (6 raqam)",
  })
  @Matches(/^\d{6}$/, {
    message: "postcode aynan 6 ta raqamdan iborat bo'lishi kerak",
  })
  postcode: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchining telefon raqami",
  })
  @Matches(/^\+998\d{9}$/, {
    message: "phone +998 bilan boshlanib, 9 ta raqamdan iborat bo'lishi kerak",
  })
  phone: string;

  @ApiProperty({
    example: "user@example.com",
    description: "Email manzil",
  })
  @IsEmail({}, { message: "email noto'g'ri formatda" })
  email: string;

  @ApiProperty({
    example: "StrongP@ss123",
    description: "Parol (kamida 6 ta belgi)",
  })
  @IsString({ message: "password matn bo'lishi kerak" })
  @MinLength(6, {
    message: "password kamida 6 ta belgidan iborat bo'lishi kerak",
  })
  password: string;

  @ApiProperty({
    example: "4 qator matn",
    description: "Foydalanuvchi haqida matn",
  })
  @IsString({ message: "about_text matn bo'lishi kerak" })
  @IsOptional()
  about_text: string;

  @ApiProperty({
    example: 2,
    description: "Foydalanuvchining roli IDsi",
  })
  @Type(() => Number)
  @IsNumber({}, { message: "role_id raqam bo'lishi kerak" })
  role_id: number;

  @ApiProperty({
    example: 2,
    description: "Foydalanuvchining media id",
  })
  @Type(() => Number)
  @IsNumber({}, { message: "media_id raqam bo'lishi kerak" })
  @IsOptional()
  media_id: number;
}
