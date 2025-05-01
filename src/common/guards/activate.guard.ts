import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class ActivateGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request | any = context.switchToHttp().getRequest();

    const payload = request.user;
    if (!payload.activate) {
      throw new ForbiddenException("Ruxasat yo'q");
    }
    return true;
  }
}
