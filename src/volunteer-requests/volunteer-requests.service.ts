import { Injectable } from "@nestjs/common";
import { VolunteerRequest } from "./entities/Volunteer-request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository } from "typeorm";
import { VolunteerRequestBodyDto } from "./dto/volunteer-request-body.dto";
import { HelpTypes } from "../help-types/entities/help-types.entity";
import { CitezenTypes } from "../citezen-types/entities/citezen-types.entity";

@Injectable()
export class VolunteerRequestsService {
  constructor(
    @InjectRepository(VolunteerRequest)
    private volunteerRequestRepository: Repository<VolunteerRequest>
  ) {}
  async createVolunteerRequest({
    help_type_ids,
    citizen_type_ids,
    ...body
  }: VolunteerRequestBodyDto) {
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

    const volunteerRequestRepository = getRepository(VolunteerRequest);
    const volunteerRequest = volunteerRequestRepository.create(body);
    volunteerRequest.helpTypes = helpTypes;
    volunteerRequest.citezenTypes = citezenTypes;
    await volunteerRequestRepository.save(volunteerRequest);
    return volunteerRequest;
  }
}
