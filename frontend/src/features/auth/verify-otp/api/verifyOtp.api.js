import { apiClient } from "../../../../shared/api/axios.js";

/**
 * @param {{ email: string, otpCode: string }} dto
 * @returns {Promise<{ verifiedToken: string }>}
 */
export const verifyOtpRequest = (dto) =>
  apiClient.post("/auth/verify-otp", dto).then((r) => r.data);
