import axios from "axios";
import { SESSION_KEY } from "@shared/constants/auth.constants.js";
import { Storage } from "@shared/lib/storage.js";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  console.error("[axios] VITE_API_URL is not set. API calls will fail.");
}

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const sessionId = Storage.get(SESSION_KEY);
    if (sessionId) {
      config.headers["x-session-id"] = sessionId;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error?.message ||
      (typeof error.response?.data?.error === "string"
        ? error.response.data.error
        : null) ||
      error.message ||
      "Request failed";

    const code = error.response?.data?.error?.code || "UNKNOWN_ERROR";
    const status = error.response?.status ?? 0;

    const normalized = new Error(message);
    normalized.code = code;
    normalized.status = status;
    return Promise.reject(normalized);
  },
);
