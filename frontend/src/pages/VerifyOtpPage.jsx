import { OtpForm } from "../features/auth/verify-otp/ui/OtpForm.jsx";
import { AUTH_SCREENS } from "../shared/constants/auth.constants.js";
import { useForgotPasswordStore } from "../features/auth/forgot-password/model/useForgotPasswordStore.js";

export function VerifyOtpPage({ onNavigate }) {
  const email = useForgotPasswordStore((s) => s.email);
  return (
    <OtpForm
      email={email}
      onSuccess={(verifiedToken) =>
        onNavigate(AUTH_SCREENS.RESET, { verifiedToken })
      }
    />
  );
}
