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
import { EducationService } from "./education.service";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";

@Controller("education")
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @ApiOperation({ summary: "Create new education record" })
  @ApiResponse({ status: 201, description: "Education created successfully" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all education records" })
  @ApiResponse({ status: 200, description: "List of education records" })
  findAll() {
    return this.educationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get education record by ID" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({ status: 200, description: "Education record found" })
  @ApiResponse({ status: 404, description: "Education record not found" })
  findOne(@Param("id") id: string) {
    return this.educationService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update education record by ID" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({ status: 200, description: "Education updated successfully" })
  @ApiResponse({ status: 404, description: "Education record not found" })
  update(
    @Param("id") id: string,
    @Body() updateEducationDto: UpdateEducationDto
  ) {
    return this.educationService.update(+id, updateEducationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete education record by ID" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({ status: 200, description: "Education deleted successfully" })
  @ApiResponse({ status: 404, description: "Education record not found" })
  remove(@Param("id") id: string) {
    return this.educationService.remove(+id);
  }
}
