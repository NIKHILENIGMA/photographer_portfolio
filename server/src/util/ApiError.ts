import { Request, Response, NextFunction } from 'express';

class ApiError extends Error {
    public statusCode: number;
    public details: any;

    constructor(message: string, statusCode: number, details: any = {}) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }

    static handleError(err: ApiError, req: Request, res: Response, next: NextFunction) {
        const errorResponse = {
            message: err.message || 'Internal Server Error',
            statusCode: err.statusCode || 500,
            details: {
                ip: req.ip,
                url: req.originalUrl,
                method: req.method,
                headers: req.headers,
                ...err.details,
            },
        };

        res.status(err.statusCode || 500).json(errorResponse);
    }
}

export default ApiError;