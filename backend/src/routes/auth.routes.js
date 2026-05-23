import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authGuard } from "../guards/auth.guard.js";
import { RateLimitProvider } from "../providers/rateLimit.provider.js";

const router = Router();

router.post("/login", RateLimitProvider.login, AuthController.login);
router.post("/register", RateLimitProvider.register, AuthController.register);
router.post(
  "/forgot-password",
  RateLimitProvider.forgotPassword,
  AuthController.forgotPassword,
);
router.post(
  "/verify-otp",
  RateLimitProvider.verifyOtp,
  AuthController.verifyOtp,
);
router.post(
  "/reset-password",
  RateLimitProvider.resetPassword,
  AuthController.resetPassword,
);
router.post("/logout", authGuard, AuthController.logout);

export default router;
