import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import _ from "lodash";
import { RoleName } from "../../constants/RoleName.enum";
import { User } from "../../users/entities/User.entity";
import { makeError } from "../../common/errors/index";

export class RequestsReadAccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    const user = request.user as User;
    const volunteerId = parseInt(request.params.id, 10);

    if (user.role === RoleName.ADMIN) {
      return true;
    } else if (volunteerId === user.id) {
      return true;
    } else if (request.query.not_moderated && user.role === RoleName.ADMIN) {
      return true;
    } else {
      throw makeError("FORBIDDEN");
    }
  }
}
