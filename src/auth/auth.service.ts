import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PhoneVerification } from "./entities/Phone-verification.entity";
import cryptoRandomString from "crypto-random-string";
import { Repository, getRepository } from "typeorm";
import { PhoneVerificationRequestDto } from "./dto/phone-verification-request.dto";
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
    phoneVerificationRequest.purpose = PurposeType.REGISTRATION;
    await phoneVerificationRepository.save(phoneVerificationRequest);
    return {
      id: phoneVerificationRequest.id,
      key: phoneVerificationRequest.key
    };
  }

  async verificationPhone(
    body: PhoneVerificationRequestDto,
    params: PhoneVerificationRequestDto
  ) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      params.id
    );

    if (!phoneVerification) {
      throw makeError("NOT_FOUND");
    } else if (
      phoneVerification.purpose != "REGISTRATION" ||
      phoneVerification.used === true ||
      phoneVerification.sms_sent_count === 5
    ) {
      throw makeError("BAD_REQUEST");
    }
  }
}
