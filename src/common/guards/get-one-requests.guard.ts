import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import _ from "lodash";
import { RoleName } from "../../constants/RoleName.enum";
import { User } from "../../users/entities/User.entity";
import { ModerationStatus } from "../../constants/ModerationStatus.enum";
import { makeError } from "../errors/index";

export class OneRequestReadAccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    const user = request.user as User;
    const volunteerId = parseInt(request.params.volunteerId, 10);

    if (user.role === RoleName.ADMIN) {
      return true;
    } else if (volunteerId === user.id) {
      return true;
    } else {
      throw makeError("FORBIDDEN");
    }
  }
}
