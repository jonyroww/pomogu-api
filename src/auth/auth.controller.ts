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
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PhoneVerification } from './entities/Phone-verification.entity';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PhoneVerificationRequestDto } from './dto/phone-verification-request.dto';
import { VerificationPhoneDto } from './dto/verification-phone.dto';
import { ParamsValidationDto } from './dto/params-validation.dto';
import { VerificationResendDto } from './dto/verification-resend.dto';
import { RegistrationBodyDto } from './dto/registration-body.dto';
import { UserLoginDto } from './dto/login-body.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/User.entity';
import { PasswordResetDto } from '../auth/dto/password-reset.dto';
import { OrganisationAdminRegistrationDto } from './dto/organisation-admin-registration.dto';
import { PhoneVerificationKey } from './interfaces/phone-verification-key.interface';
import { AccessToken } from 'src/common/interfaces/access-token.interface';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/phone-verification')
  @ApiTags('Phone verification')
  @ApiCreatedResponse({ type: () => PhoneVerification })
  createPhoneVerification(
    @Body() body: PhoneVerificationRequestDto,
  ): Promise<PhoneVerificationKey> {
    return this.authService.createPhoneVerification(body);
  }

  @Put('/phone-verification/:id')
  @ApiTags('Phone verification')
  @ApiOkResponse({ type: () => PhoneVerification })
  verificationPhone(
    @Body() body: VerificationPhoneDto,
    @Param() params: ParamsValidationDto,
  ): Promise<PhoneVerification> {
    return this.authService.verificationPhone(body, params);
  }

  @Put('/phone-verification/:id/resend')
  @ApiTags('Phone verification')
  @ApiOkResponse({ type: () => PhoneVerification })
  verificationPhoneResend(
    @Body() body: VerificationResendDto,
    @Param() params: ParamsValidationDto,
  ): Promise<PhoneVerification> {
    return this.authService.verificationPhoneResend(body, params);
  }

  @Post('/registration')
  @ApiTags('Auth')
  @ApiCreatedResponse({ type: () => PhoneVerification })
  registrationUser(@Body() body: RegistrationBodyDto): Promise<AccessToken> {
    return this.authService.registrationUser(body);
  }

  @Post('/organisations/registration')
  @ApiTags('Auth')
  @ApiCreatedResponse({ type: () => PhoneVerification })
  registrationOrganisation(
    @Body() body: OrganisationAdminRegistrationDto,
  ): Promise<AccessToken> {
    return this.authService.registrationOrganisationAdmin(body);
  }

  @Post('/login')
  @ApiTags('Auth')
  @ApiOkResponse()
  @ApiBody({ type: () => UserLoginDto })
  @UseGuards(AuthGuard('local'))
  async userLogin(@GetUser() user: User) {
    return await this.authService.userLogin(user);
  }

  @ApiTags('Auth')
  @ApiOkResponse()
  @Put('/password-reset')
  passwordReset(@Body() body: PasswordResetDto) {
    return this.authService.passwordReset(body);
  }

  @Get('/me')
  @ApiTags('Auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async me(@GetUser() user: User) {
    return user;
  }
}
