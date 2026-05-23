import { useState } from "react";
import { LoginForm } from "../features/auth/login/ui/LoginForm.jsx";
import { AUTH_SCREENS } from "../shared/constants/auth.constants.js";

export function LoginPage({ onNavigate }) {
  return (
    <LoginForm
      onSuccess={() => onNavigate(AUTH_SCREENS.APP)}
      onRegister={() => onNavigate(AUTH_SCREENS.REGISTER)}
      onForgot={() => onNavigate(AUTH_SCREENS.FORGOT)}
    />
  );
}
