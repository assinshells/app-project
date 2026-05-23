import { create } from "zustand";
import { logoutRequest } from "../api/logout.api.js";
import { Storage } from "../../../../shared/lib/storage.js";
import { SESSION_KEY } from "../../../../shared/constants/auth.constants.js";

export const useLogoutStore = create((set) => ({
  loading: false,

  logout: async (onSuccess) => {
    set({ loading: true });
    try {
      await logoutRequest();
    } catch (_) {
      // Игнорируем — сессия может быть уже истекшей
    } finally {
      Storage.remove(SESSION_KEY);
      set({ loading: false });
      onSuccess();
    }
  },
}));
