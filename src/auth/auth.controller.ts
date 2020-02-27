import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  Post,
  Put,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Header,
  Get,
  UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PhoneVerification } from "./entities/Phone-verification.entity";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody
} from "@nestjs/swagger";
import { PhoneVerificationRequestDto } from "./dto/phone-verification-request.dto";
import { VerificationPhoneDto } from "./dto/verification-phone.dto";
import { ParamsValidationDto } from "./dto/params-validation.dto";
import { VerificationResendDto } from "./dto/verification-resend.dto";
import { registrationBodyDto } from "./dto/registration-body.dto";
import { UserLoginDto } from "./dto/login-body.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../common/decorators/get-user.decorator";
import { User } from "../users/entities/User.entity";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags("Phone verification")
  @ApiCreatedResponse({ type: PhoneVerification })
  @Post("/phone-verification")
  createPhoneVerification(@Body() body: PhoneVerificationRequestDto) {
    return this.authService.createPhoneVerification(body);
  }

  @ApiCreatedResponse({ type: PhoneVerification })
  @Put("/phone-verification/:id")
  verificationPhone(
    @Body() body: VerificationPhoneDto,
    @Param() params: ParamsValidationDto
  ) {
    return this.authService.verificationPhone(body, params);
  }

  @ApiCreatedResponse({ type: PhoneVerification })
  @Put("/phone-verification/:id/resend")
  verificationPhoneResend(
    @Body() body: VerificationResendDto,
    @Param() params: ParamsValidationDto
  ) {
    return this.authService.verificationPhoneResend(body, params);
  }

  @ApiTags("Auth")
  @ApiCreatedResponse({ type: PhoneVerification })
  @Post("/registration")
  registrationUser(@Body() body: registrationBodyDto) {
    return this.authService.registrationUser(body);
  }

  @ApiTags("Auth")
  @ApiOkResponse()
  @Post("/login")
  @ApiBody({ type: UserLoginDto })
  @UseGuards(AuthGuard("local"))
  async userLogin(@GetUser() user: User) {
    return await this.authService.userLogin(user);
  }
}
