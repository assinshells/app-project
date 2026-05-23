import { OtpRepository } from "../repositories/otp.repository.js";
import { OtpProvider } from "../providers/otp.provider.js";
import { SessionProvider } from "../providers/session.provider.js";
import {
  OtpExpiredException,
  OtpInvalidException,
} from "../exceptions/auth.exceptions.js";

export const OtpService = {
  async generateOtp(userId) {
    const otp = OtpProvider.generate();
    await OtpRepository.saveOtp(userId, otp);
    return otp;
  },

  async validateOtp(userId, otpCode) {
    const stored = await OtpRepository.getOtp(userId);
    if (!stored) throw new OtpExpiredException();
    if (stored !== otpCode) throw new OtpInvalidException();
    return true;
  },

  async invalidateOtp(userId) {
    await OtpRepository.deleteOtp(userId);
  },

  async createVerifiedToken(userId) {
    const token = SessionProvider.generateSessionId();
    await OtpRepository.saveVerifiedToken(token, userId);
    return token;
  },

  async consumeVerifiedToken(token) {
    const userId = await OtpRepository.getVerifiedToken(token);
    if (!userId) return null;
    await OtpRepository.deleteVerifiedToken(token);
    return userId;
  },
};
