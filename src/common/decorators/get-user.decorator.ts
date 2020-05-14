import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import _ from 'lodash';
import { User } from '../../users/entities/User.entity';

export const GetUser = createParamDecorator(
  (path: string, req: Request): any => {
    if (path) {
      return _.get(req.user, path, undefined);
    }

    return req.user as User;
  },
);
