import { Request, Response, NextFunction } from "express";
import { NODE_ENV } from "../config/app.config";

type ErrorStructure = {
  status?: number;
  message?: string;
  stack?: string;
  details?: any;
};
class GlobalErrorHandler {
  static handleError(
    err: ErrorStructure,
    _: Request,
    res: Response,
    next: NextFunction
  ): void {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[Error] ${message}`, err);

    res.status(statusCode).json({
      success: false,
      message,
      stack: NODE_ENV === "production" ? undefined : err.stack,
    });

    next(err); // Call the next middleware in the stack
  }
}

export default GlobalErrorHandler;
