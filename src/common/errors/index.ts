import { HttpException, HttpStatus } from "@nestjs/common";

export const errors = {
  USER_NOT_FOUND: HttpStatus.NOT_FOUND,
  WRONG_LOGIN_OR_PASSWORD: HttpStatus.UNAUTHORIZED,
  NO_SUCH_ORGANISATION: HttpStatus.NOT_FOUND,
  UNAUTHORIZED: HttpStatus.UNAUTHORIZED,
  NOT_FOUND: HttpStatus.NOT_FOUND
};

export type ErrorCode = keyof typeof errors;

export const makeError = (code: ErrorCode, additional: object = {}) => {
  const status = errors[code];

  const err = new HttpException(
    {
      statusCode: status,
      code,
      ...additional
    },
    status
  );

  return err;
};
