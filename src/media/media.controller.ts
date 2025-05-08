import { Controller, Get, Param, Delete } from "@nestjs/common";
import { MediaService } from "./media.service";

@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.mediaService.remove(+id);
  }
}
