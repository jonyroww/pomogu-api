import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import _ from "lodash";
import { RoleName } from "../../constants/RoleName.enum";
import { User } from "../../users/entities/User.entity";
import { makeError } from "../errors/index";

export class AcceptRequestAccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    const user = request.user as User;

    if (user.role === RoleName.VOLUNTEER) {
      return true;
    } else {
      throw makeError("FORBIDDEN");
    }
  }
}
