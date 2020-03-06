import { HelpTypesRepository } from "../../help-types/repositories/Help-types.repository";

export async function getHelpTypes(
  helpTypesRepository: HelpTypesRepository,
  helpTypeIds: Array<number>
) {
  if (helpTypeIds && helpTypeIds.length != 0) {
    return await helpTypesRepository
      .createQueryBuilder("help_types")
      .where("id IN (:...helpTypesId)", {
        helpTypesId: helpTypeIds
      })
      .getMany();
  } else {
    return [];
  }
}
