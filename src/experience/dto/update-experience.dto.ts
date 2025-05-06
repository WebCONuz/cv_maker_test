import { PartialType } from "@nestjs/swagger";
import { CreateExperienceDto } from "./create-experience.dto";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
  @ApiProperty({ example: "Tech Corp", description: "Name of the company" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  company_name: string;

  @ApiProperty({
    example: "123 Silicon Valley, CA",
    description: "Company address",
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 200)
  company_address: string;

  @ApiProperty({
    example: "Software Engineer",
    description: "Position held in the company",
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  position: string;

  @ApiProperty({
    example: "2022-01-01",
    description: "Start date (YYYY-MM-DD)",
  })
  @IsDateString()
  start_time: Date;

  @ApiProperty({ example: "2023-01-01", description: "End date (YYYY-MM-DD)" })
  @IsDateString()
  end_time: Date;

  @ApiProperty({
    example: "Worked on mobile app development.",
    description: "Job description",
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 1000)
  description: string;

  @ApiProperty({
    example: true,
    description: "Whether the job is current or not",
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: 101,
    description: "Foreign key for related entity (e.g., user_id)",
  })
  @IsInt()
  relation_id: number;
}
