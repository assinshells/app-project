const API_URL = import.meta.env.VITE_API_URL;

const getSessionId = () => localStorage.getItem("sessionId");

const authFetch = async (path, body) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(getSessionId() ? { "x-session-id": getSessionId() } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

export const apiLogin = (login, password) =>
  authFetch("/auth/login", { login, password });

export const apiRegister = (login, password, email) =>
  authFetch("/auth/register", { login, password, email });

export const apiForgotPassword = (email) =>
  authFetch("/auth/forgot-password", { email });

export const apiVerifyOtp = (email, otpCode) =>
  authFetch("/auth/verify-otp", { email, otpCode });

export const apiResetPassword = (verifiedToken, password, confirmPassword) =>
  authFetch("/auth/reset-password", {
    verifiedToken,
    password,
    confirmPassword,
  });

export const apiLogout = () => authFetch("/auth/logout", {});
