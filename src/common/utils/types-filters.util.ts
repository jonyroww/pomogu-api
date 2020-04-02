import { Repository, Brackets, SelectQueryBuilder } from "typeorm";
import _ from "lodash";

export function setTypesFilters(
  qb: SelectQueryBuilder<any>,
  helpTypes?: Array<number>,
  citezenTypes?: Array<number>
) {
  const leftJoinHelpTypes = `${qb.alias}_help_types`;
  const leftJoinCitezenTypes = `${qb.alias}_citezen_types`;

  if (!_.isEmpty(helpTypes) || !_.isEmpty(citezenTypes)) {
    if (!_.isEmpty(helpTypes)) {
      qb.leftJoin(`${qb.alias}.helpTypes`, leftJoinHelpTypes);
    }
    if (!_.isEmpty(citezenTypes)) {
      qb.leftJoin(`${qb.alias}.citezenTypes`, leftJoinCitezenTypes);
    }
    qb.where(
      new Brackets(qb => {
        qb.andWhere("FALSE");
        if (!_.isEmpty(helpTypes)) {
          qb.orWhere(`${leftJoinHelpTypes}.id IN (:...helpTypesId)`, {
            helpTypesId: helpTypes
          });
        }
        if (!_.isEmpty(citezenTypes)) {
          qb.orWhere(`${leftJoinCitezenTypes}.id IN (:...citezenTypes)`, {
            citezenTypes: citezenTypes
          });
        }
      })
    );
  }
}
