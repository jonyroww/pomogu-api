import { makeError } from '../../common/errors/index';

export function checkPhoneVerification(
  phoneVerification,
  verification_id,
  verification_key,
  purposeType,
) {
  if (!phoneVerification) {
    throw makeError('RECORD_NOT_FOUND');
  } else if (phoneVerification.purpose != purposeType) {
    throw makeError('PURPOSE_IS_NOT_CORRECT');
  } else if (verification_id !== phoneVerification.id) {
    throw makeError('VERIFICATION_ID_IS_NOT_VALID');
  } else if (phoneVerification.key != verification_key) {
    throw makeError('KEY_IS_NOT_VALID');
  } else if (phoneVerification.success !== true) {
    throw makeError('CODE_ALREADY_USED');
  } else if (phoneVerification.used === true) {
    throw makeError('VERIFICATION_ALREADY_USED');
  }
}
