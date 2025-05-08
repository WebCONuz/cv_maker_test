import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Response, Request } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @UseInterceptors(FileInterceptor("avatar"))
  signup(@Body() createUserDto: CreateUserDto, @UploadedFile() avatar: any) {
    return this.authService.signup(createUserDto, avatar);
  }

  @Post("sign-in")
  signin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.signin(signInDto, response);
  }

  @Get("sign-out")
  signout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.signuot(request, response);
  }

  @Get("refreshTokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.refreshToken(request, response);
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.authService.activateUser(link);
  }
}
