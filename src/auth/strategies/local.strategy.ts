import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { makeError } from "../../common/errors";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      phone: "phone",
      passwordField: "password"
    });
  }

  async validate(phone: string, password: string) {
    const user = await this.authService.validateUser(phone, password);
    if (!user) {
      throw makeError("WRONG_PASSWORD");
    }
    return user;
  }
}
