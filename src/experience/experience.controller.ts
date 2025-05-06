import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ExperienceService } from "./experience.service";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { UpdateExperienceDto } from "./dto/update-experience.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@Controller("experience")
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  @ApiOperation({ summary: "Create new experience record" })
  @ApiResponse({ status: 201, description: "Experience successfully created." })
  @ApiResponse({ status: 400, description: "Validation error." })
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all experience records" })
  @ApiResponse({ status: 200, description: "List of all experiences" })
  findAll() {
    return this.experienceService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get single experience by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Experience ID",
  })
  @ApiResponse({ status: 200, description: "Experience found" })
  @ApiResponse({ status: 404, description: "Experience not found" })
  findOne(@Param("id") id: string) {
    return this.experienceService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update experience by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Experience ID to update",
  })
  @ApiResponse({ status: 200, description: "Experience updated" })
  @ApiResponse({ status: 404, description: "Experience not found" })
  update(
    @Param("id") id: string,
    @Body() updateExperienceDto: UpdateExperienceDto
  ) {
    return this.experienceService.update(+id, updateExperienceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete experience by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Experience ID to delete",
  })
  @ApiResponse({ status: 204, description: "Experience deleted" })
  @ApiResponse({ status: 404, description: "Experience not found" })
  remove(@Param("id") id: string) {
    return this.experienceService.remove(+id);
  }
}
