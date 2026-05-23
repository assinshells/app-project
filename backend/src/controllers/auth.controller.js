import { AuthService } from "../services/auth.service.js";
import {
  toLoginRequestDto,
  toRegisterRequestDto,
  toForgotPasswordDto,
  toVerifyOtpDto,
  toResetPasswordDto,
} from "../dto/auth.dto.js";
import {
  validateLoginRequest,
  validateRegisterRequest,
  validateForgotPasswordRequest,
  validateVerifyOtpRequest,
  validateResetPasswordRequest,
} from "../validators/auth.validator.js";
import { HTTP_STATUS } from "../constants/auth.constants.js";

/**
 * AuthController — только routing-логика:
 * получить запрос → вызвать сервис → вернуть ответ.
 * Никакой бизнес-логики. Все ошибки передаются в next(err).
 */
export const AuthController = {
  login: async (req, res, next) => {
    try {
      validateLoginRequest(req.body);
      const dto = toLoginRequestDto(req.body);
      const result = await AuthService.login(dto);
      res.status(HTTP_STATUS.OK).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  register: async (req, res, next) => {
    try {
      validateRegisterRequest(req.body);
      const dto = toRegisterRequestDto(req.body);
      const result = await AuthService.register(dto);
      res.status(HTTP_STATUS.CREATED).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      validateForgotPasswordRequest(req.body);
      const dto = toForgotPasswordDto(req.body);
      const result = await AuthService.forgotPassword(dto);
      res.status(HTTP_STATUS.OK).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  verifyOtp: async (req, res, next) => {
    try {
      validateVerifyOtpRequest(req.body);
      const dto = toVerifyOtpDto(req.body);
      const result = await AuthService.verifyOtp(dto);
      res.status(HTTP_STATUS.OK).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      validateResetPasswordRequest(req.body);
      const dto = toResetPasswordDto(req.body);
      const result = await AuthService.resetPassword(dto);
      res.status(HTTP_STATUS.OK).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      const result = await AuthService.logout({ sessionId: req.sessionId });
      res.status(HTTP_STATUS.OK).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },
};
