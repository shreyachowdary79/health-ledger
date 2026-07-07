import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middleware/errorHandler";
import { analyticsRouter } from "./routes/analyticsRoutes";
import { authRouter } from "./routes/authRoutes";
import { foodLogRouter } from "./routes/foodLogRoutes";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

app.get("/health", (_req, res) => res.json({ status: "ok", service: "health-ledger-api" }));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use("/api/foodlogs", foodLogRouter);
app.use("/api/analytics", analyticsRouter);

app.use(errorHandler);
