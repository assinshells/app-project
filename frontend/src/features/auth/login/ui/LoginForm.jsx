import { useState } from "react";
import { useLoginStore } from "../model/useLoginStore.js";

/**
 * LoginForm — тупой компонент.
 * Только отображение и сбор данных.
 * Вся логика в useLoginStore.
 */
export function LoginForm({ onSuccess, onRegister, onForgot }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, login: doLogin, clearError } = useLoginStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    doLogin({ login, password }, onSuccess);
  };

  return (
    <div>
      <h2>Sign In</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p>
        <button type="button" onClick={onForgot}>
          Forgot Password
        </button>
        {" | "}
        <button type="button" onClick={onRegister}>
          Registration
        </button>
      </p>
    </div>
  );
}
