const { getLogger } = require("../../logger/logger");

function genRequestId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substring(2, 7)
  ).toUpperCase();
}

function requestLogger(req, res, next) {
  const requestId = genRequestId();
  const start = process.hrtime.bigint();

  const baseLogger = getLogger({ service: "core", requestId });
  req.requestId = requestId;
  req.log = baseLogger.child({ route: req.path, method: req.method });

  req.log.info({ msg: "request:start" });

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;

    req.log.info({
      msg: "request:end",
      status: res.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
    });
  });

  next();
}

module.exports = requestLogger;
