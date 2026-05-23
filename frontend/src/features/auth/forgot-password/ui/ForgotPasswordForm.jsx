import { useState } from "react";
import { useForgotPasswordStore } from "@features/auth/forgot-password/model/useForgotPasswordStore.js";

export function ForgotPasswordForm({ onSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const { loading, error, submit, clearError } = useForgotPasswordStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    submit({ email }, onSuccess);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
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
