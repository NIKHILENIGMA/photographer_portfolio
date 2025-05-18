import { Request, Response } from 'express'
import { EApplicationEnvironment } from '../types/base.types'
import { NODE_ENV } from '../config/app.config'

type THttpResponse = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data?: unknown
}

/**
 * Sends a standardized API response.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param responseStatusCode - The status code to send in the response.
 * @param responseMessage - The message to send in the response.
 * @param data - Optional data to include in the response. Defaults to null.
 *
 * @returns void
 */

export const ApiResponse = (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.url
        },
        message: responseMessage,
        data: data
    }

    // If the environment is production, remove the IP address from the response
    if (NODE_ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }

    res.status(responseStatusCode).json(response)
}
