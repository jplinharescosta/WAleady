import { LoggerOptions } from "../../types";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: any;
}

interface Logger {
  debug: (objOrMsg: string | LogContext, extra?: LogContext) => void;
  info: (objOrMsg: string | LogContext, extra?: LogContext) => void;
  warn: (objOrMsg: string | LogContext, extra?: LogContext) => void;
  error: (objOrMsg: string | LogContext, extra?: LogContext) => void;
  child: (ctx?: LogContext) => Logger;
}

function ts(): string {
  return new Date().toISOString();
}

function levelToString(level: LogLevel): string {
  const map: Record<LogLevel, string> = { 
    debug: "DEBUG", 
    info: "INFO", 
    warn: "WARN", 
    error: "ERROR" 
  };
  return map[level] || "INFO";
}

function safeSerialize(obj: any): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return JSON.stringify({ _nonSerializable: true });
  }
}

function createBaseLogger(defaultContext: LogContext = {}): Logger {
  function log(level: LogLevel, messageOrObject: string | LogContext, extra: LogContext = {}): void {
    const base: LogContext = {
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
    debug: (objOrMsg: string | LogContext, extra?: LogContext) => log("debug", objOrMsg, extra),
    info: (objOrMsg: string | LogContext, extra?: LogContext) => log("info", objOrMsg, extra),
    warn: (objOrMsg: string | LogContext, extra?: LogContext) => log("warn", objOrMsg, extra),
    error: (objOrMsg: string | LogContext, extra?: LogContext) => log("error", objOrMsg, extra),
    child: (ctx: LogContext = {}) => createBaseLogger({ ...defaultContext, ...ctx }),
  };
}

export function getLogger(context: LoggerOptions = { service: "core" }): Logger {
  return createBaseLogger(context);
}