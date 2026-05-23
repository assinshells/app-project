import { useState, useEffect } from "react";
import socket from "./socket/socket.js";
import {
  AUTH_SCREENS,
  SESSION_KEY,
} from "./shared/constants/auth.constants.js";
import { Storage } from "./shared/lib/storage.js";
import { useLogoutStore } from "./features/auth/logout/model/useLogoutStore.js";

import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.jsx";
import { VerifyOtpPage } from "./pages/VerifyOtpPage.jsx";
import { ResetPasswordPage } from "./pages/ResetPasswordPage.jsx";

const getInitialScreen = () =>
  Storage.get(SESSION_KEY) ? AUTH_SCREENS.APP : AUTH_SCREENS.LOGIN;

export default function App() {
  const [screen, setScreen] = useState(getInitialScreen);
  const [screenParams, setScreenParams] = useState({});
  const [connected, setConnected] = useState(false);
  const { logout } = useLogoutStore();

  const navigate = (newScreen, params = {}) => {
    setScreen(newScreen);
    setScreenParams(params);
  };

  useEffect(() => {
    if (screen !== AUTH_SCREENS.APP) return;

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

  const handleLogout = () => logout(() => navigate(AUTH_SCREENS.LOGIN));

  if (screen === AUTH_SCREENS.REGISTER)
    return <RegisterPage onNavigate={navigate} />;

  if (screen === AUTH_SCREENS.FORGOT)
    return <ForgotPasswordPage onNavigate={navigate} />;

  if (screen === AUTH_SCREENS.OTP)
    return <VerifyOtpPage onNavigate={navigate} />;

  if (screen === AUTH_SCREENS.RESET)
    return (
      <ResetPasswordPage
        onNavigate={navigate}
        verifiedToken={screenParams.verifiedToken}
      />
    );

  if (screen === AUTH_SCREENS.APP)
    return (
      <div>
        <p>Socket.IO: {connected ? "Connected" : "Disconnected"}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );

  return <LoginPage onNavigate={navigate} />;
}
