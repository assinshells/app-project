import { ForgotPasswordForm } from "../features/auth/forgot-password/ui/ForgotPasswordForm.jsx";
import { AUTH_SCREENS } from "../shared/constants/auth.constants.js";

export function ForgotPasswordPage({ onNavigate }) {
  return (
    <ForgotPasswordForm
      onSuccess={() => onNavigate(AUTH_SCREENS.OTP)}
      onBack={() => onNavigate(AUTH_SCREENS.LOGIN)}
    />
  );
}
