import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  Post,
  Put,
  Param
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PhoneVerification } from "./entities/Phone-verification.entity";
import { ApiTags, ApiCreatedResponse } from "@nestjs/swagger";
import { PhoneVerificationRequestDto } from "./dto/phone-verification-request.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("auth/phone-verification")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags("Phone verification")
  @ApiCreatedResponse({ type: PhoneVerification })
  @Post()
  createPhoneVerification(@Body() body: PhoneVerificationRequestDto) {
    return this.authService.createPhoneVerification(body);
  }

  @ApiCreatedResponse({ type: PhoneVerification })
  @Put("/:id")
  verifivcatePhone(
    @Body() body: PhoneVerificationRequestDto,
    @Param() params: PhoneVerificationRequestDto
  ) {
    return this.authService.verificationPhone(body, params);
  }
}
