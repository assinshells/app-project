/**
 * DTO — Data Transfer Objects.
 * Используются для явного описания входящих и исходящих данных.
 * Все поля типизированы через JSDoc.
 */

/**
 * @typedef {Object} LoginRequestDto
 * @property {string} login
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterRequestDto
 * @property {string} login
 * @property {string} password
 * @property {string|undefined} email
 */

/**
 * @typedef {Object} ForgotPasswordDto
 * @property {string} email
 */

/**
 * @typedef {Object} VerifyOtpDto
 * @property {string} email
 * @property {string} otpCode
 */

/**
 * @typedef {Object} ResetPasswordDto
 * @property {string} verifiedToken
 * @property {string} password
 * @property {string} confirmPassword
 */

/**
 * @typedef {Object} AuthResponseDto
 * @property {boolean} success
 * @property {string|undefined} sessionId
 * @property {string|undefined} verifiedToken
 */

/**
 * @typedef {Object} ErrorResponseDto
 * @property {boolean} success
 * @property {{ code: string, message: string, details?: string[] }} error
 */

export const toLoginRequestDto = (body) => ({
  login: body.login,
  password: body.password,
});

export const toRegisterRequestDto = (body) => ({
  login: body.login,
  password: body.password,
  email: body.email || undefined,
});

export const toForgotPasswordDto = (body) => ({
  email: body.email,
});

export const toVerifyOtpDto = (body) => ({
  email: body.email,
  otpCode: body.otpCode,
});

export const toResetPasswordDto = (body) => ({
  verifiedToken: body.verifiedToken,
  password: body.password,
  confirmPassword: body.confirmPassword,
});
