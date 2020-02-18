import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PhoneVerification } from "./entities/Phone-verification.entity";
import cryptoRandomString from "crypto-random-string";
import { Repository, getRepository } from "typeorm";
import { PhoneVerificationRequestDto } from "./dto/phone-verification-request.dto";
import { VerificationPhoneDto } from "./dto/verfication-phone.dto";
import { VerificationResendDto } from "./dto/verification-resend.dto";
import { ParamsValidationDto } from "./dto/params-validation.dto";
import { PurposeType } from "src/constants/PurposeType.enum";
import { makeError } from "../common/errors/index";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PhoneVerification)
    private phoneVerificationRepository: Repository<PhoneVerification>
  ) {}
  async createPhoneVerification(body: PhoneVerificationRequestDto) {
    const phoneVerificationRepository = getRepository(PhoneVerification);
    const phoneVerificationRequest = phoneVerificationRepository.create(body);
    phoneVerificationRequest.key = cryptoRandomString({ length: 32 });
    phoneVerificationRequest.sms_code = "111111";
    phoneVerificationRequest.sms_sent_count = 1;
    phoneVerificationRequest.sms_last_sent_at = new Date();
    phoneVerificationRequest.purpose = PurposeType.REGISTRATION;
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
    } else if (phoneVerification.purpose != "REGISTRATION") {
      throw makeError("PURPOSE_IS_NOT_REGISTRATION");
    } else if (body.key != phoneVerification.key) {
      throw makeError("KEY_IS_NOT_VALID");
    } else if (phoneVerification.success === true) {
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
    } else if (phoneVerification.purpose != "REGISTRATION") {
      throw makeError("PURPOSE_IS_NOT_REGISTRATION");
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
}
