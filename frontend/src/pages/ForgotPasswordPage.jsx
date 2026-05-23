import { ForgotPasswordForm } from "../features/auth/forgot-password/ui/ForgotPasswordForm.jsx";
import { AUTH_SCREENS } from "../shared/constants/auth.constants.js";
import { useForgotPasswordStore } from "../features/auth/forgot-password/model/useForgotPasswordStore.js";

export function ForgotPasswordPage({ onNavigate }) {
  const email = useForgotPasswordStore((s) => s.email);
  return (
    <ForgotPasswordForm
      onSuccess={() => onNavigate(AUTH_SCREENS.OTP, { email })}
    />
  );
}
