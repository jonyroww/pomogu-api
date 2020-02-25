import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PhoneVerification } from "./entities/Phone-verification.entity";
import cryptoRandomString from "crypto-random-string";
import { Repository, getRepository } from "typeorm";
import { PhoneVerificationRequestDto } from "./dto/phone-verification-request.dto";
import { VerificationPhoneDto } from "./dto/verfication-phone.dto";
import { VerificationResendDto } from "./dto/verification-resend.dto";
import { ParamsValidationDto } from "./dto/params-validation.dto";
import { makeError } from "../common/errors/index";
import { registrationBodyDto } from "./dto/registration-body.dto";
import { User } from "../users/entities/User.entity";
import { PurposeType } from "src/constants/PurposeType.enum";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/users/repositories/User.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PhoneVerification)
    private phoneVerificationRepository: Repository<PhoneVerification>,
    private readonly jwtService: JwtService
  ) {}
  async createPhoneVerification(body: PhoneVerificationRequestDto) {
    const phoneVerificationRepository = getRepository(PhoneVerification);
    const phoneVerificationRequest = phoneVerificationRepository.create(body);
    phoneVerificationRequest.key = cryptoRandomString({ length: 32 });
    phoneVerificationRequest.sms_code = "111111";
    phoneVerificationRequest.sms_sent_count = 1;
    phoneVerificationRequest.sms_last_sent_at = new Date();
    phoneVerificationRequest.purpose = body.purpose;
    await phoneVerificationRepository.save(phoneVerificationRequest);
    return {
      id: phoneVerificationRequest.id,
      key: phoneVerificationRequest.key
    };
  }

  async verificationPhone(
    body: VerificationPhoneDto,
    params: ParamsValidationDto
  ) {
    const phoneVerificationRepository = getRepository(PhoneVerification);
    const phoneVerification = await phoneVerificationRepository.findOne(
      params.id
    );

    if (!phoneVerification) {
      throw makeError("RECORD_NOT_FOUND");
    } else if (body.key != phoneVerification.key) {
      throw makeError("KEY_IS_NOT_VALID");
    } else if (phoneVerification.success !== false) {
      throw makeError("CODE_ALREADY_USED");
    } else if (phoneVerification.used === true) {
      throw makeError("VERIFICATION_ALREADY_USED");
    } else if (phoneVerification.wrong_attempts_count > 5) {
      throw makeError("MAX_LIMIT_OF_WRONG_ATTEMPTS");
    }

    if (phoneVerification.sms_code != body.sms_code) {
      phoneVerification.wrong_attempts_count += 1;
      await phoneVerificationRepository.save(phoneVerification);
      throw makeError("SMS_CODE_IS_NOT_CORRECT");
    } else {
      phoneVerification.success = true;
      await phoneVerificationRepository.save(phoneVerification);
    }

    return phoneVerification;
  }

  async verificationPhoneResend(
    body: VerificationResendDto,
    params: ParamsValidationDto
  ) {
    const phoneVerificationRepository = getRepository(PhoneVerification);
    const phoneVerification = await phoneVerificationRepository.findOne(
      params.id
    );

    if (!phoneVerification) {
      throw makeError("RECORD_NOT_FOUND");
    } else if (body.key != phoneVerification.key) {
      throw makeError("KEY_IS_NOT_VALID");
    } else if (phoneVerification.success === true) {
      throw makeError("CODE_ALREADY_USED");
    } else if (phoneVerification.used === true) {
      throw makeError("VERIFICATION_ALREADY_USED");
    } else if (phoneVerification.sms_sent_count > 5) {
      throw makeError("LIMIT_EXCEEDED");
    }
    const interval = Date.now() - phoneVerification.sms_last_sent_at.getTime();
    if (interval < 2 * 60 * 1000) {
      throw makeError("TIME_INTERVAL_IS_NOT_OVER");
    }

    phoneVerification.sms_sent_count += 1;
    phoneVerification.wrong_attempts_count = 0;
    phoneVerification.sms_last_sent_at = new Date();
    await phoneVerificationRepository.save(phoneVerification);

    return phoneVerification;
  }

  async registrationUser(body: registrationBodyDto) {
    const phoneVerificationRepository = getRepository(PhoneVerification);
    const phoneVerification = await phoneVerificationRepository.findOne(
      body.verification_id
    );

    if (!phoneVerification) {
      throw makeError("RECORD_NOT_FOUND");
    } else if (phoneVerification.purpose !== PurposeType.REGISTRATION) {
      throw makeError("PURPOSE_IS_NOT_CORRECT");
    } else if (phoneVerification.key !== body.verification_key) {
      throw makeError("KEY_IS_NOT_VALID");
    } else if (phoneVerification.success !== true) {
      throw makeError("CODE_ALREADY_USED");
    } else if (phoneVerification.used === true) {
      throw makeError("VERIFICATION_ALREADY_USED");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    const userRepository = getRepository(User);
    const user = userRepository.create(body);

    const isPhoneUnique = await userRepository.findOne({
      phone: phoneVerification.phone
    });
    const isEmailUnique = await userRepository.findOne({ email: body.email });
    if (isPhoneUnique) {
      throw makeError("PHONE_ALREADY_EXISTS");
    } else if (isEmailUnique) {
      throw makeError("EMAIL_ALREADY_EXISTS");
    }
    user.role = "VOLUNTEER";
    user.phone = phoneVerification.phone;
    await userRepository.save(user);
    phoneVerification.user_id = user.id;
    phoneVerification.used = true;
    await phoneVerificationRepository.save(phoneVerification);

    const token = this.jwtService.sign({
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
    });
    return { token: token };
  }
}
