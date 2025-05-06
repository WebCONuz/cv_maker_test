import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUrl, IsInt } from "class-validator";

export class CreateSocialMediaDto {
  @ApiProperty({
    example: "Instagram",
    description: "Name of the social media platform",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "https://instagram.com/username",
    description: "URL to the social media account",
  })
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    example: "username",
    description: "Account name on the platform",
  })
  @IsString()
  @IsNotEmpty()
  account_name: string;

  @ApiProperty({
    example: 101,
    description: "Relation ID (e.g. user ID or profile ID)",
  })
  @IsInt()
  relation_id: number;
}
