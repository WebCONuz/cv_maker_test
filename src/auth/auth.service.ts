import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    readonly jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);

    // emailga ctivate link yuboriladi

    return {
      success: true,
      message: "Sign up successfully",
    };
  }

  async signin(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException("Email yoki parol xato");
    }

    const compared = await bcrypt.compare(signInDto.password, user.password);
    if (!compared) {
      throw new BadRequestException("Email yoki parol xato");
    }

    const { access_token, refresh_token } = await this.generateTokens(user);

    user.refresh_token = refresh_token;
    await user.save();

    res.cookie("refresh_token", refresh_token, {
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
      httpOnly: true,
    });

    return {
      success: true,
      message: "signin successufully",
      access_token,
    };
  }

  async signuot(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }

    const user = await this.usersService.findByToken(refresh_token);
    if (!user) {
      throw new BadRequestException("Token topilmadi");
    }

    user.refresh_token = "";
    await user.save();

    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }

  async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      login: user.email,
      activate: user.is_active,
    };

    const access_token = await this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });
    const refresh_token = await this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
