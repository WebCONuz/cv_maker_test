import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request | any = context.switchToHttp().getRequest();

    const [bearer, token] = request.headers?.authorization?.split(" ");
    const payload = this.jwtService.verify(token, {
      secret: process.env.ACCESS_TOKEN_KEY,
    });

    request.user = payload;
    return true;
  }
}
