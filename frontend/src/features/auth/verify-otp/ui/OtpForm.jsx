import { useState } from "react";
import { useVerifyOtpStore } from "@features/auth/verify-otp/model/useVerifyOtpStore.js";

export function OtpForm({ email, onSuccess, onBack }) {
  const [otpCode, setOtpCode] = useState("");
  const { loading, error, verify, clearError } = useVerifyOtpStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    verify({ email, otpCode }, onSuccess);
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <p>Enter the code sent to {email}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP Code</label>
          <input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            maxLength={6}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
      <p>
        <button type="button" onClick={onBack}>
          ← Back
        </button>
      </p>
    </div>
  );
}
