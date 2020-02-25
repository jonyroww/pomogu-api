import { Injectable } from "@nestjs/common";
import { VolunteerRequest } from "./entities/Volunteer-request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository } from "typeorm";
import { VolunteerRequestBodyDto } from "./dto/volunteer-request-body.dto";
import { HelpTypes } from "../help-types/entities/help-types.entity";
import { CitezenTypes } from "../citezen-types/entities/citezen-types.entity";
import { Organisation } from "src/organisations/entities/Organisation.entity";
import { PhoneVerification } from "../auth/entities/Phone-verification.entity";
import { makeError } from "../common/errors/index";
import { PurposeType } from "src/constants/PurposeType.enum";
import { MailerService } from "@nest-modules/mailer";
import { Transactional } from "typeorm-transactional-cls-hooked";

@Injectable()
export class VolunteerRequestsService {
  constructor(
    @InjectRepository(VolunteerRequest)
    private volunteerRequestRepository: Repository<VolunteerRequest>,
    private readonly mailerService: MailerService
  ) {}

  @Transactional()
  async createVolunteerRequest({
    help_type_ids,
    citizen_type_ids,
    organisation_ids,
    ...body
  }: VolunteerRequestBodyDto) {
    const phoneVerificationRepository = getRepository(PhoneVerification);
    const phoneVerification = await phoneVerificationRepository.findOne(
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

    const helpTypes =
      help_type_ids && help_type_ids.length != 0
        ? await getRepository(HelpTypes)
            .createQueryBuilder("help_types")
            .where("id IN (:...helpTypesId)", {
              helpTypesId: help_type_ids
            })
            .getMany()
        : [];
    const citezenTypes =
      citizen_type_ids && citizen_type_ids.length != 0
        ? await getRepository(CitezenTypes)
            .createQueryBuilder("citezen_types")
            .where("id IN (:...citezenTypesId)", {
              citezenTypesId: citizen_type_ids
            })
            .getMany()
        : [];
    const organisations =
      organisation_ids && organisation_ids.length != 0
        ? await getRepository(Organisation)
            .createQueryBuilder("organisations")
            .where("id IN (:...organisationId)", {
              organisationId: organisation_ids
            })
            .getMany()
        : [];

    const volunteerRequestRepository = getRepository(VolunteerRequest);
    const volunteerRequest = volunteerRequestRepository.create(body);
    volunteerRequest.helpTypes = helpTypes;
    volunteerRequest.citezenTypes = citezenTypes;
    volunteerRequest.organisations = organisations;
    volunteerRequest.verification_id = body.verification_id;
    volunteerRequest.phone = phoneVerification.phone;
    await volunteerRequestRepository.save(volunteerRequest);
    phoneVerification.used = true;
    await phoneVerificationRepository.save(phoneVerification);

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
