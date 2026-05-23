import { create } from "zustand";
import { verifyOtpRequest } from "../api/verifyOtp.api.js";

export const useVerifyOtpStore = create((set) => ({
  loading: false,
  error: null,

  verify: async ({ email, otpCode }, onSuccess) => {
    set({ loading: true, error: null });
    try {
      const data = await verifyOtpRequest({ email, otpCode });
      onSuccess(data.verifiedToken);
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
