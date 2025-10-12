function ts() {
  return new Date().toISOString();
}

function levelToString(level) {
  const map = { debug: "DEBUG", info: "INFO", warn: "WARN", error: "ERROR" };
  return map[level] || "INFO";
}

function safeSerialize(obj) {
  try {
    return JSON.stringify(obj);
  } catch {
    return JSON.stringify({ _nonSerializable: true });
  }
}

function createBaseLogger(defaultContext = {}) {
  function log(level, messageOrObject, extra = {}) {
    base = {
      ts: ts(),
      level: levelToString(level),
      service: defaultContext.service || "core",
      env: process.env.NODE_ENV || "development",
      ...defaultContext,
      ...extra,
    };

    if (typeof messageOrObject === "string") {
      base.msg = messageOrObject;
    } else if (messageOrObject && typeof messageOrObject === "object") {
      if (messageOrObject.msg && typeof messageOrObject.msg === "string") {
        base.msg = messageOrObject.msg;
        Object.assign(base, { ...messageOrObject, msg: base.msg });
      } else {
        base.msg = base.msg || "log";
        Object.assign(base, messageOrObject);
      }
    } else {
      base.msg = base.msg || "log";
    }

    const line = safeSerialize(base);

    if (level === "error") {
      console.error(line);
    } else {
      console.log(line);
    }
  }

  return {
    debug: (objOrMsg, extra) => log("debug", objOrMsg, extra),
    info: (objOrMsg, extra) => log("info", objOrMsg, extra),
    warn: (objOrMsg, extra) => log("warn", objOrMsg, extra),
    error: (objOrMsg, extra) => log("error", objOrMsg, extra),
    child: (ctx = {}) => createBaseLogger({ ...defaultContext, ...ctx }),
  };
}

function getLogger(context = {}) {
  return createBaseLogger(context);
}

module.exports = { getLogger };
