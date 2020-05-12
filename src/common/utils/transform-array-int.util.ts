import { TransformInt } from './transform-int.util';
import _ from 'lodash';

export function TransformIntArray(value: any): Array<number> {
  if (_.isArray(value)) {
    return value.map(TransformInt);
  } else {
    return value;
  }
}
