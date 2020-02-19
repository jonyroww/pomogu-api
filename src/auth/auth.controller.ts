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
import { VerificationPhoneDto } from "./dto/verfication-phone.dto";
import { ParamsValidationDto } from "./dto/params-validation.dto";
import { VerificationResendDto } from "./dto/verification-resend.dto";

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
  verificationPhone(
    @Body() body: VerificationPhoneDto,
    @Param() params: ParamsValidationDto
  ) {
    return this.authService.verificationPhone(body, params);
  }

  @ApiCreatedResponse({ type: PhoneVerification })
  @Put("/:id/resend")
  verificationPhoneResend(
    @Body() body: VerificationResendDto,
    @Param() params: ParamsValidationDto
  ) {
    return this.authService.verificationPhoneResend(body, params);
  }
}
