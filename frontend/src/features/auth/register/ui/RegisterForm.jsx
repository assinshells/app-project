import { useState } from "react";
import { useRegisterStore } from "@features/auth/register/model/useRegisterStore.js";

export function RegisterForm({ onSuccess, onBack }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loading, error, register, clearError } = useRegisterStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    register({ login, password, email }, onSuccess);
  };

  return (
    <div>
      <h2>Registration</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email (optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
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
