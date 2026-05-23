import { create } from "zustand";
import { loginRequest } from "../api/login.api.js";
import { Storage } from "../../../../shared/lib/storage.js";
import { SESSION_KEY } from "../../../../shared/constants/auth.constants.js";

export const useLoginStore = create((set) => ({
  loading: false,
  error: null,

  login: async ({ login, password }, onSuccess) => {
    set({ loading: true, error: null });
    try {
      const data = await loginRequest({ login, password });
      Storage.set(SESSION_KEY, data.sessionId);
      onSuccess();
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
