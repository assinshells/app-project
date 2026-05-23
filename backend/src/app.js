import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import logger from "./config/logger.js";
import authRoutes from "./routes/auth.routes.js";
import { globalExceptionHandler } from "./handlers/globalException.handler.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

// Глобальный обработчик ошибок — должен быть последним
app.use(globalExceptionHandler);

export default app;
