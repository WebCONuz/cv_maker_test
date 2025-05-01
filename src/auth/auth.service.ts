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
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: MailService,
    private readonly jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);

    // emailga ctivate link yuboriladi
    await this.emailService.sendMail(newUser);

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

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("activation link yo'q");
    }
    const updatedUser = await this.usersService.activate(link);
    return {
      message: "Foydalanuvchi muvaffaqiyatli aktivatsiyadan o'tdi",
      is_active: updatedUser.is_active,
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

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }
    const decoded_token = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const user = await this.usersService.findOne(+decoded_token.id);
    if (!user) {
      throw new BadRequestException("Token topilmadi");
    }

    const { access_token, refresh_token } = await this.generateTokens(user);
    user.refresh_token = refresh_token;
    await user.save();

    res.cookie("refresh_token", refresh_token, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });
    return {
      success: true,
      message: "Tokenlar yangilandi!",
      access_token,
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
