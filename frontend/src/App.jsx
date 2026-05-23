import { useState, useEffect } from "react";
import socket from "./socket/socket.js";
import LoginForm from "./auth/LoginForm.jsx";
import RegisterForm from "./auth/RegisterForm.jsx";
import ForgotPasswordForm from "./auth/ForgotPasswordForm.jsx";
import OtpForm from "./auth/OtpForm.jsx";
import ResetPasswordForm from "./auth/ResetPasswordForm.jsx";
import { apiLogout } from "./api/auth.js";

// Screens: login | register | forgot | otp | reset | app
const getInitialScreen = () =>
  localStorage.getItem("sessionId") ? "app" : "login";

export default function App() {
  const [screen, setScreen] = useState(getInitialScreen);
  const [connected, setConnected] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [verifiedToken, setVerifiedToken] = useState("");

  useEffect(() => {
    if (screen !== "app") return;

    socket.connect();
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [screen]);

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (_) {
      // ignore
    }
    localStorage.removeItem("sessionId");
    setScreen("login");
  };

  if (screen === "register") {
    return <RegisterForm onSuccess={() => setScreen("login")} />;
  }

  if (screen === "forgot") {
    return (
      <ForgotPasswordForm
        onEmail={(email) => setResetEmail(email)}
        onSuccess={() => setScreen("otp")}
      />
    );
  }

  if (screen === "otp") {
    return (
      <OtpForm
        email={resetEmail}
        onSuccess={(token) => {
          setVerifiedToken(token);
          setScreen("reset");
        }}
      />
    );
  }

  if (screen === "reset") {
    return (
      <ResetPasswordForm
        verifiedToken={verifiedToken}
        onSuccess={() => setScreen("login")}
      />
    );
  }

  if (screen === "app") {
    return (
      <div>
        <p>Socket.IO: {connected ? "Connected" : "Disconnected"}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // login (default)
  return (
    <LoginForm
      onSuccess={() => setScreen("app")}
      onRegister={() => setScreen("register")}
      onForgot={() => setScreen("forgot")}
    />
  );
}
