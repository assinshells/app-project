import { create } from "zustand";
import { forgotPasswordRequest } from "../api/forgotPassword.api.js";

export const useForgotPasswordStore = create((set) => ({
  loading: false,
  error: null,
  email: "",

  setEmail: (email) => set({ email }),

  submit: async ({ email }, onSuccess) => {
    set({ loading: true, error: null });
    try {
      await forgotPasswordRequest({ email });
      set({ email });
      onSuccess();
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
