import { BaseException } from "./base.exception.js";
import { HTTP_STATUS, AUTH_ERRORS } from "../constants/auth.constants.js";

export class ValidationException extends BaseException {
  constructor(message = AUTH_ERRORS.VALIDATION_FAILED, details = []) {
    super(message, HTTP_STATUS.BAD_REQUEST, "VALIDATION_FAILED");
    this.details = details;
  }
}

export class AuthenticationException extends BaseException {
  constructor(message = AUTH_ERRORS.INVALID_CREDENTIALS) {
    super(message, HTTP_STATUS.UNAUTHORIZED, "AUTHENTICATION_FAILED");
  }
}

export class AuthorizationException extends BaseException {
  constructor(message = AUTH_ERRORS.UNAUTHORIZED) {
    super(message, HTTP_STATUS.FORBIDDEN, "AUTHORIZATION_FAILED");
  }
}

export class NotFoundException extends BaseException {
  constructor(message = AUTH_ERRORS.USER_NOT_FOUND) {
    super(message, HTTP_STATUS.NOT_FOUND, "NOT_FOUND");
  }
}

export class ConflictException extends BaseException {
  constructor(message) {
    super(message, HTTP_STATUS.CONFLICT, "CONFLICT");
  }
}

export class RateLimitException extends BaseException {
  constructor(message = AUTH_ERRORS.RATE_LIMIT_EXCEEDED) {
    super(message, HTTP_STATUS.TOO_MANY, "RATE_LIMIT_EXCEEDED");
  }
}

export class SessionExpiredException extends BaseException {
  constructor(message = AUTH_ERRORS.SESSION_INVALID) {
    super(message, HTTP_STATUS.UNAUTHORIZED, "SESSION_EXPIRED");
  }
}

export class OtpExpiredException extends BaseException {
  constructor(message = AUTH_ERRORS.OTP_EXPIRED) {
    super(message, HTTP_STATUS.BAD_REQUEST, "OTP_EXPIRED");
  }
}

export class OtpInvalidException extends BaseException {
  constructor(message = AUTH_ERRORS.OTP_INVALID) {
    super(message, HTTP_STATUS.BAD_REQUEST, "OTP_INVALID");
  }
}
