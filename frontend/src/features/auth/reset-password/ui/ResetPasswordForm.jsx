import { useState } from "react";
import { useResetPasswordStore } from "../model/useResetPasswordStore.js";

export function ResetPasswordForm({ verifiedToken, onSuccess, onBack }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, reset, clearError } = useResetPasswordStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    reset({ verifiedToken, password, confirmPassword }, onSuccess);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Password"}
        </button>
      </form>
      <p>
        <button type="button" onClick={onBack}>
          ← Back to Login
        </button>
      </p>
    </div>
  );
}
