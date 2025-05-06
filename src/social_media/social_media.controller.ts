import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { SocialMediaService } from "./social_media.service";
import { CreateSocialMediaDto } from "./dto/create-social_media.dto";
import { UpdateSocialMediaDto } from "./dto/update-social_media.dto";

@Controller("social-media")
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post()
  @ApiOperation({ summary: "Create new social media entry" })
  @ApiResponse({
    status: 201,
    description: "Social media created successfully",
  })
  @ApiResponse({ status: 400, description: "Validation error" })
  create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.create(createSocialMediaDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all social media entries" })
  @ApiResponse({ status: 200, description: "List of social media entries" })
  findAll() {
    return this.socialMediaService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one social media entry by ID" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({ status: 200, description: "Social media entry found" })
  @ApiResponse({ status: 404, description: "Entry not found" })
  findOne(@Param("id") id: string) {
    return this.socialMediaService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update social media entry by ID" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "Social media updated successfully",
  })
  @ApiResponse({ status: 404, description: "Entry not found" })
  update(
    @Param("id") id: string,
    @Body() updateSocialMediaDto: UpdateSocialMediaDto
  ) {
    return this.socialMediaService.update(+id, updateSocialMediaDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete social media entry by ID" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "Social media deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Entry not found" })
  remove(@Param("id") id: string) {
    return this.socialMediaService.remove(+id);
  }
}
