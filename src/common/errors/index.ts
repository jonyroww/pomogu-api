import { HttpException, HttpStatus } from '@nestjs/common';

export const errors = {
  USER_NOT_FOUND: HttpStatus.NOT_FOUND,
  WRONG_PASSWORD: HttpStatus.UNAUTHORIZED,
  NO_SUCH_ORGANISATION: HttpStatus.NOT_FOUND,
  UNAUTHORIZED: HttpStatus.UNAUTHORIZED,
  RECORD_NOT_FOUND: HttpStatus.NOT_FOUND,
  BAD_REQUEST: HttpStatus.BAD_REQUEST,
  FORBIDDEN: HttpStatus.FORBIDDEN,
  PURPOSE_IS_NOT_CORRECT: HttpStatus.BAD_REQUEST,
  KEY_IS_NOT_VALID: HttpStatus.FORBIDDEN,
  VERIFICATION_ALREADY_USED: HttpStatus.BAD_REQUEST,
  LIMIT_EXCEEDED: HttpStatus.BAD_REQUEST,
  TIME_INTERVAL_IS_NOT_OVER: HttpStatus.BAD_REQUEST,
  SMS_CODE_IS_NOT_CORRECT: HttpStatus.BAD_REQUEST,
  CODE_ALREADY_USED: HttpStatus.BAD_REQUEST,
  MAX_LIMIT_OF_WRONG_ATTEMPTS: HttpStatus.BAD_REQUEST,
  VERIFICATION_ID_IS_NOT_VALID: HttpStatus.BAD_REQUEST,
  EMAIL_SEND_ERROR: HttpStatus.BAD_REQUEST,
  PHONE_ALREADY_EXISTS: HttpStatus.BAD_REQUEST,
  EMAIL_ALREADY_EXISTS: HttpStatus.BAD_REQUEST,
  REQUEST_ALREADY_IN_PROGRESS: HttpStatus.BAD_REQUEST,
  TYPE_WAS_DELETED: HttpStatus.NOT_FOUND,
  REQUEST_MUST_BE_IN_PROGRESS: HttpStatus.BAD_REQUEST,
  NOTIFICATION_NOT_FOUND: HttpStatus.NOT_FOUND,
  USER_IS_REJECTED: HttpStatus.FORBIDDEN,
  USER_MUST_BE_APPROVED: HttpStatus.FORBIDDEN
};

export type ErrorCode = keyof typeof errors;

export const makeError = (code: ErrorCode, additional: object = {}) => {
  const status = errors[code];

  const err = new HttpException(
    {
      statusCode: status,
      code,
      ...additional,
    },
    status,
  );

  return err;
};
