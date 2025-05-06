import { PartialType } from "@nestjs/swagger";
import { CreateEducationDto } from "./create-education.dto";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsDateString,
  IsBoolean,
  IsInt,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from "class-validator";

export class UpdateEducationDto extends PartialType(CreateEducationDto) {
  @ApiProperty({
    example: "Tashkent University of Information Technologies",
    description: "Name of the educational institution",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: "2020-09-01",
    description: "Start date of education (YYYY-MM-DD)",
  })
  @IsDateString()
  start_time: Date;

  @ApiProperty({
    example: "2024-06-30",
    description: "End date of education (YYYY-MM-DD)",
  })
  @IsDateString()
  end_time: Date;

  @ApiProperty({
    example: "Student",
    description: "Position held during the study period",
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    example: "Computer Science",
    description: "Faculty or major specialization",
  })
  @IsString()
  @IsNotEmpty()
  faculty: string;

  @ApiProperty({
    example: "Studied software development and system design.",
    description: "Short description of the study period",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @ApiProperty({
    example: 1001,
    description: "Relation ID to the user or resume",
  })
  @IsInt()
  relation_id: number;

  @ApiProperty({
    example: true,
    description: "Whether the education record is active",
  })
  @IsBoolean()
  is_active: boolean;
}
