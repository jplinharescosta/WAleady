import { LoggerOptions } from "../../types";
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
export declare function getLogger(context?: LoggerOptions): Logger;
export {};
