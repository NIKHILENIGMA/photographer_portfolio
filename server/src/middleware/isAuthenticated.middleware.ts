import { NextFunction, Response } from 'express'
import { ACCESS_TOKEN_SECRET } from '../config/app.config'
import { AdminService } from '../services/admin.service'
import { verifyToken } from '../util/JWT'
import { BadRequestError, NotFoundError, StandardError, UnauthorizedError } from '../util'
import { User } from '../types/base.types'
import { CustomRequest } from '../app-request'

function extractTokenFromHeader(header: string): string | null {
    if (!header || header === '') return null
    const parts = header.split(' ')
    return parts.length === 2 ? parts[1] : null
}

export const isAuthenticated = async (req: CustomRequest, res: Response, next: NextFunction) => {
    let accessToken
    if (req.headers.authorization) {
        accessToken = extractTokenFromHeader(req.headers.authorization)
    } else if (req.cookies) {
        const cookies = req.cookies as Record<string, string> // Check if the token is in cookies
        accessToken = cookies['access_token'] // Adjust the cookie name as needed
    }

    if (!accessToken) {
        throw new UnauthorizedError('No token provided in request')
    }

    try {
        const decoded = verifyToken(accessToken, ACCESS_TOKEN_SECRET)
        if (!decoded) {
            throw new BadRequestError('Invalid token')
        }

        if (!decoded?.sub) {
            throw new BadRequestError('Token does not contain user')
        }

        const user: User | null = await AdminService.findUserById(decoded?.sub) // Ensure the user exists in the database
        if (!user || user === null) {
            throw new NotFoundError('User not found')
        }
        // Attach the user to the request object
        req.user = user

        next() // Proceed to the next middleware or route handler
    } catch (error) {
        if (error instanceof StandardError) {
            throw error // Re-throw known errors
        }

        throw new UnauthorizedError('Unauthorized access') // Handle unknown errors
    }
}
