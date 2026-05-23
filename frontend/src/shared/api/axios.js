import axios from "axios";
import { SESSION_KEY } from "@shared/constants/auth.constants.js";

/**
 * apiClient — единый axios-клиент.
 * - request interceptor: автоматически подставляет sessionId
 * - response interceptor: нормализует ошибки
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor — подставляем токен сессии
apiClient.interceptors.request.use(
  (config) => {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      config.headers["x-session-id"] = sessionId;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — нормализуем ошибки
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.error ||
      error.message ||
      "Request failed";
    const code = error.response?.data?.error?.code || "UNKNOWN_ERROR";
    const status = error.response?.status || 0;

    const normalized = new Error(message);
    normalized.code = code;
    normalized.status = status;
    return Promise.reject(normalized);
  },
);
