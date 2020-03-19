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
  ApiBody,
  ApiBearerAuth
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
import { PasswordResetDto } from "../auth/dto/password-reset.dto";
import { UpdatePhoneNumberDto } from "./dto/update-phone-number.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/phone-verification")
  @ApiTags("Phone verification")
  @ApiCreatedResponse({ type: PhoneVerification })
  createPhoneVerification(@Body() body: PhoneVerificationRequestDto) {
    return this.authService.createPhoneVerification(body);
  }

  @Put("/phone-verification/:id")
  @ApiTags("Phone verification")
  @ApiCreatedResponse({ type: PhoneVerification })
  verificationPhone(
    @Body() body: VerificationPhoneDto,
    @Param() params: ParamsValidationDto
  ) {
    return this.authService.verificationPhone(body, params);
  }

  @Put("/phone-verification/:id/resend")
  @ApiTags("Phone verification")
  @ApiCreatedResponse({ type: PhoneVerification })
  verificationPhoneResend(
    @Body() body: VerificationResendDto,
    @Param() params: ParamsValidationDto
  ) {
    return this.authService.verificationPhoneResend(body, params);
  }

  @Post("/registration")
  @ApiTags("Auth")
  @ApiCreatedResponse({ type: PhoneVerification })
  registrationUser(@Body() body: registrationBodyDto) {
    return this.authService.registrationUser(body);
  }

  @Post("/login")
  @ApiTags("Auth")
  @ApiOkResponse()
  @ApiBody({ type: UserLoginDto })
  @UseGuards(AuthGuard("local"))
  async userLogin(@GetUser() user: User) {
    return await this.authService.userLogin(user);
  }

  @ApiTags("Auth")
  @ApiCreatedResponse()
  @Put("/password-reset")
  passwordReset(@Body() body: PasswordResetDto) {
    return this.authService.passwordReset(body);
  }

  @ApiTags("Auth")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Put("/update-phone-number")
  updatePhoneNumber(@Body() body, @GetUser() user: User) {
    return this.authService.updatePhoneNumber(body, user);
  }

  @Get("/me")
  @ApiTags("Auth")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async me(@GetUser() user: User) {
    return user;
  }
}
