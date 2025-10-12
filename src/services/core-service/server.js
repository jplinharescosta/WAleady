require("dotenv").config();
const express = require("express");
const pool = require("../../shared/config/database");
const { getLogger } = require("../../shared/logger/logger");
const requestLogger = require("../../shared/middlewares/logging/requestLogger");

const app = express();
const PORT = process.env.CORE_SERVICE_PORT || 3001;

const logger = getLogger({ service: "core" });
logger.info({ msg: "Core starting..." });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "Ok",
    service: "WhatsApp CORE Service",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: "Connected",
  });
});

// API Routes
app.use("/api/v1/groups", require("./routes/groupRoutes"));
app.use("/api/v1/broadcast", require("./routes/broadcastRoutes"));

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// 404 handler
app.use((req, res) => {
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
