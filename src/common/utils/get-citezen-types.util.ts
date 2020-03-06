import { CitezenTypesRepository } from "../../citezen-types/repositories/Citezen-types.repository";

export async function getCitezenTypes(
  citezenTypesRepository: CitezenTypesRepository,
  citezenTypeIds: Array<number>
) {
  if (citezenTypeIds && citezenTypeIds.length != 0) {
    return await citezenTypesRepository
      .createQueryBuilder("citezen_types")
      .where("id IN (:...citezenTypesId)", {
        citezenTypesId: citezenTypeIds
      })
      .getMany();
  } else {
    return [];
  }
}
