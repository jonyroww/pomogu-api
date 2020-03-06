import { OrganisationRepository } from "../../organisations/repositories/Organisation.repository";

export async function getOrganisations(
  organisationRepository: OrganisationRepository,
  organisationIds: Array<number>
) {
  if (organisationIds && organisationIds.length != 0) {
    return await organisationRepository
      .createQueryBuilder("organisations")
      .where("id IN (:...organisationId)", {
        organisationId: organisationIds
      })
      .getMany();
  } else {
    return [];
  }
}
