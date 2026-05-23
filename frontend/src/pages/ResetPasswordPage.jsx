import { ResetPasswordForm } from "../features/auth/reset-password/ui/ResetPasswordForm.jsx";
import { AUTH_SCREENS } from "../shared/constants/auth.constants.js";

export function ResetPasswordPage({ onNavigate, verifiedToken }) {
  return (
    <ResetPasswordForm
      verifiedToken={verifiedToken}
      onSuccess={() => onNavigate(AUTH_SCREENS.LOGIN)}
      onBack={() => onNavigate(AUTH_SCREENS.LOGIN)}
    />
  );
}
