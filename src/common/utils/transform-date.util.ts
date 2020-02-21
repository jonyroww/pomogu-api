import _ from "lodash";

export function TransformDate(dateStr: String): Date {
  if (dateStr === "" || dateStr === null || dateStr === undefined) {
    return undefined;
  }

  if (_.isString(dateStr)) {
    const reverseDate = dateStr
      .split(".")
      .reverse()
      .join("-");

    return new Date(reverseDate);
  }
}
