import _ from 'lodash';

export function TransformBoolean(booleanStr: string): boolean {
  if (booleanStr === '' || booleanStr === null || booleanStr === undefined) {
    return undefined;
  }

  if (_.isString(booleanStr)) {
    if (booleanStr == 'true' || booleanStr == 'True') {
      return true;
    }
    if (booleanStr == 'false' || booleanStr == 'False') {
      return false;
    }
  }
}
