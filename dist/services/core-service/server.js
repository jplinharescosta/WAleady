"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const logger_1 = require("../../shared/logger/logger");
const requestLogger_1 = __importDefault(require("../../shared/middlewares/logging/requestLogger"));
// Import TypeScript routes
const groupRoutes_1 = __importDefault(require("./routes/groupRoutes"));
const broadcastRoutes_1 = __importDefault(require("./routes/broadcastRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.CORE_SERVICE_PORT || 3001;
const logger = (0, logger_1.getLogger)({ service: "core" });
logger.info({ msg: "Core starting..." });
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(requestLogger_1.default);
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
app.use("/api/v1/groups", groupRoutes_1.default);
app.use("/api/v1/broadcast", broadcastRoutes_1.default);
// Error handling
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
app.use(errorHandler);
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
//# sourceMappingURL=server.js.map