import "dotenv/config";
import express, { Request, Response } from "express";
import { ErrorRequestHandler } from "express";
import { getLogger } from "../../shared/logger/logger";
import requestLogger from "../../shared/middlewares/logging/requestLogger";

// Import TypeScript routes
import groupRoutes from "./routes/groupRoutes";
import broadcastRoutes from "./routes/broadcastRoutes";

const app = express();
const PORT = process.env.CORE_SERVICE_PORT || 3001;

const logger = getLogger({ service: "core" });
logger.info({ msg: "Core starting..." });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "Ok",
    service: "WhatsApp CORE Service",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: "Connected",
  });
});

// API Routes
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/broadcast", broadcastRoutes);

// Error handling
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CORE Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Groups API: http://localhost:${PORT}/api/v1/groups`);
});
