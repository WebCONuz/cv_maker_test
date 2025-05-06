import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
} from "class-validator";

export class CreateSkillDto {
  @ApiProperty({
    example: "JavaScript",
    description: "Name of the skill",
  })
  @IsString()
  @IsNotEmpty({ message: "Skill name must not be empty" })
  name: string;

  @ApiProperty({
    example: "Programming",
    description: "Type of the skill",
    enum: ["Programming", "Design", "Management"],
  })
  @IsEnum(["Programming", "Design", "Management"], {
    message:
      "Type must be one of the following: Programming, Design, or Management",
  })
  type: "Programming" | "Design" | "Management";

  @ApiProperty({
    example: true,
    description: "Indicates whether the skill is active",
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: 1,
    description: "Relation ID associated with the skill",
  })
  @IsNumber()
  @IsNotEmpty({ message: "Relation ID must be a valid number" })
  relation_id: number;
}
