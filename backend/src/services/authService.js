import crypto from "crypto";
import { pool } from "../config/database.js";
import { redisClient } from "../config/redis.js";
import logger from "../config/logger.js";

const HASH_ITERATIONS = 64;
const HASH_KEYLEN = 64;
const HASH_ALG = "sha512";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days
const OTP_TTL = 60 * 10; // 10 minutes

const hashPassword = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, HASH_KEYLEN, (err, key) => {
      if (err) reject(err);
      else resolve(key.toString("hex"));
    });
  });

const generateSalt = () => crypto.randomBytes(16).toString("hex");

const generateSessionId = () => crypto.randomBytes(32).toString("hex");

const generateOtp = () => String(crypto.randomInt(0, 1000000)).padStart(6, "0");

export const hashPasswordWithSalt = async (password) => {
  const salt = generateSalt();
  const hash = await hashPassword(password, salt);
  return `${salt}:${hash}`;
};

export const verifyPassword = async (password, stored) => {
  const [salt, hash] = stored.split(":");
  const candidate = await hashPassword(password, salt);
  return crypto.timingSafeEqual(
    Buffer.from(candidate, "hex"),
    Buffer.from(hash, "hex"),
  );
};

export const login = async (login, password) => {
  const { rows } = await pool.query(
    "SELECT id, password_hash FROM users WHERE login = $1",
    [login],
  );

  if (!rows.length) {
    return { error: "Invalid login or password", status: 401 };
  }

  const user = rows[0];
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return { error: "Invalid login or password", status: 401 };
  }

  const sessionId = generateSessionId();
  await redisClient.set(`session:${sessionId}`, String(user.id), {
    EX: SESSION_TTL,
  });

  return { sessionId };
};

export const register = async (login, password, email) => {
  const { rows: loginRows } = await pool.query(
    "SELECT id FROM users WHERE login = $1",
    [login],
  );
  if (loginRows.length) {
    return { error: "Login already taken", status: 409 };
  }

  if (email) {
    const { rows: emailRows } = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );
    if (emailRows.length) {
      return { error: "Email already taken", status: 409 };
    }
  }

  const passwordHash = await hashPasswordWithSalt(password);

  await pool.query(
    "INSERT INTO users (login, password_hash, email) VALUES ($1, $2, $3)",
    [login, passwordHash, email || null],
  );

  return { success: true };
};

export const forgotPassword = async (email) => {
  const { rows } = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  if (!rows.length) {
    // Don't reveal whether email exists
    return { success: true };
  }

  const userId = rows[0].id;
  const otp = generateOtp();

  await redisClient.set(`otp:${userId}`, otp, { EX: OTP_TTL });

  logger.info(`Forgot Password OTP:\nemail=${email}\notp=${otp}`);

  return { success: true };
};

export const verifyOtp = async (email, otpCode) => {
  const { rows } = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  if (!rows.length) {
    return { error: "Invalid OTP", status: 400 };
  }

  const userId = rows[0].id;
  const stored = await redisClient.get(`otp:${userId}`);

  if (!stored) {
    return { error: "OTP expired or not found", status: 400 };
  }

  if (stored !== otpCode) {
    return { error: "Invalid OTP", status: 400 };
  }

  // Mark OTP as verified by replacing with a verified token
  const verifiedToken = generateSessionId();
  await redisClient.set(`otp_verified:${verifiedToken}`, String(userId), {
    EX: OTP_TTL,
  });
  await redisClient.del(`otp:${userId}`);

  return { verifiedToken };
};

export const resetPassword = async (verifiedToken, password) => {
  const userId = await redisClient.get(`otp_verified:${verifiedToken}`);

  if (!userId) {
    return { error: "Reset token expired or invalid", status: 400 };
  }

  const passwordHash = await hashPasswordWithSalt(password);

  await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
    passwordHash,
    userId,
  ]);

  await redisClient.del(`otp_verified:${verifiedToken}`);

  return { success: true };
};

export const logout = async (sessionId) => {
  await redisClient.del(`session:${sessionId}`);
  return { success: true };
};
