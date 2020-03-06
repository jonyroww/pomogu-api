import { Injectable } from "@nestjs/common";
import { VolunteerRequest } from "./entities/Volunteer-request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { VolunteerRequestBodyDto } from "./dto/volunteer-request-body.dto";
import { makeError } from "../common/errors/index";
import { PurposeType } from "src/constants/PurposeType.enum";
import { MailerService } from "@nest-modules/mailer";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { VolunteerRequestRepository } from "./repositories/Volunteer-request.repositories";
import { PhoneVerificationRepository } from "../auth/repository/Phone-verification.repository";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";
import { OrganisationRepository } from "../organisations/repositories/Organisation.repository";
import { getHelpTypes } from "../common/utils/get-help-types.util";
import { getCitezenTypes } from "../common/utils/get-citezen-types.util";
import { getOrganisations } from "../common/utils/get-organisations.util";

@Injectable()
export class VolunteerRequestsService {
  constructor(
    @InjectRepository(VolunteerRequest)
    private volunteerRequestRepository: VolunteerRequestRepository,
    private phoneVerificationRepository: PhoneVerificationRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository,
    private organisationRepository: OrganisationRepository,
    private readonly mailerService: MailerService
  ) {}

  @Transactional()
  async createVolunteerRequest({
    help_type_ids,
    citizen_type_ids,
    organisation_ids,
    ...body
  }: VolunteerRequestBodyDto) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      body.verification_id
    );

    if (!phoneVerification) {
      throw makeError("RECORD_NOT_FOUND");
    } else if (phoneVerification.purpose != PurposeType.NEW_VOLUNTEER_REQUEST) {
      throw makeError("PURPOSE_IS_NOT_CORRECT");
    } else if (body.verification_id !== phoneVerification.id) {
      throw makeError("VERIFICATION_ID_IS_NOT_VALID");
    } else if (phoneVerification.key != body.verification_key) {
      throw makeError("KEY_IS_NOT_VALID");
    } else if (phoneVerification.success !== true) {
      throw makeError("CODE_ALREADY_USED");
    } else if (phoneVerification.used === true) {
      throw makeError("VERIFICATION_ALREADY_USED");
    }
    const helpTypes = await getHelpTypes(
      this.helpTypesRepository,
      help_type_ids
    );
    const citezenTypes = await getCitezenTypes(
      this.citezenTypesRepository,
      citizen_type_ids
    );
    const organisations = await getOrganisations(
      this.organisationRepository,
      organisation_ids
    );
    const volunteerRequest = this.volunteerRequestRepository.create(body);
    volunteerRequest.helpTypes = helpTypes;
    volunteerRequest.citezenTypes = citezenTypes;
    volunteerRequest.organisations = organisations;
    volunteerRequest.verification_id = body.verification_id;
    volunteerRequest.phone = phoneVerification.phone;
    await this.volunteerRequestRepository.save(volunteerRequest);
    phoneVerification.used = true;
    await this.phoneVerificationRepository.save(phoneVerification);

    if (volunteerRequest.email) {
      await this.mailerService.sendMail({
        to: volunteerRequest.email,
        from: "socqr@mail.ru",
        subject: "ЯПомогу - анкета волонтера",
        template: "pomogu1.html",
        context: {
          firstName: volunteerRequest.first_name,
          middleName: volunteerRequest.middle_name,
          lastName: volunteerRequest.last_name,
          email: volunteerRequest.email,
          phone: volunteerRequest.phone,
          city: volunteerRequest.city,
          comment: volunteerRequest.comment,
          citezenTypes: volunteerRequest.citezenTypes,
          helpTypes: volunteerRequest.helpTypes,
          organisations: volunteerRequest.organisations
        }
      });
    }
    return volunteerRequest;
  }
}
