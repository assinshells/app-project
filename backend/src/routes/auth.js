import { Router } from "express";
import {
  login,
  register,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logout,
} from "../services/authService.js";
import requireAuth from "../middleware/auth.js";
import logger from "../config/logger.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { login: userLogin, password } = req.body;

  if (!userLogin || !password) {
    return res.status(400).json({ error: "login and password are required" });
  }

  try {
    const result = await login(userLogin, password);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json({ sessionId: result.sessionId });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { login: userLogin, password, email } = req.body;

  if (!userLogin || !password) {
    return res.status(400).json({ error: "login and password are required" });
  }

  try {
    const result = await register(userLogin, password, email);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.status(201).json({ success: true });
  } catch (err) {
    logger.error(`Register error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "email is required" });
  }

  try {
    await forgotPassword(email);
    res.json({ success: true });
  } catch (err) {
    logger.error(`Forgot password error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otpCode } = req.body;

  if (!email || !otpCode) {
    return res.status(400).json({ error: "email and otpCode are required" });
  }

  try {
    const result = await verifyOtp(email, otpCode);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json({ verifiedToken: result.verifiedToken });
  } catch (err) {
    logger.error(`Verify OTP error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { verifiedToken, password, confirmPassword } = req.body;

  if (!verifiedToken || !password || !confirmPassword) {
    return res.status(400).json({
      error: "verifiedToken, password and confirmPassword are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const result = await resetPassword(verifiedToken, password);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json({ success: true });
  } catch (err) {
    logger.error(`Reset password error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", requireAuth, async (req, res) => {
  try {
    await logout(req.sessionId);
    res.json({ success: true });
  } catch (err) {
    logger.error(`Logout error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
