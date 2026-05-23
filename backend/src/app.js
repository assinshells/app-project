import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import logger from "./config/logger.js";
import authRoutes from "./routes/auth.routes.js";
import { globalExceptionHandler } from "./handlers/globalException.handler.js";

const CLIENT_URL = process.env.CLIENT_URL;

if (!CLIENT_URL) {
  logger.warn("CLIENT_URL is not set — CORS will block all browser requests");
}

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL || false,
    credentials: true,
  }),
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.use(globalExceptionHandler);

export default app;
