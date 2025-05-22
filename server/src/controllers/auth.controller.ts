import { Request, Response } from 'express'
import { ApiResponse, BadRequestError, DatabaseError, InternalServerError, NotFoundError, StandardError, UnauthorizedError } from '../util'
import { AuthenticationServices } from '../services/auth.service'
import { loginSchema, signupSchema } from '../validators/auth.validators'
import { z } from 'zod'
import { Authenticated } from '../types/base.types'
import { CustomRequest } from '../app-request'

export class AuthenticationController {
    static async signup(req: Request, res: Response) {
        try {
            const validateData = signupSchema.parse(req.body)

            const successMessage = await AuthenticationServices.register(validateData)
            if (!successMessage) {
                throw new DatabaseError('Failed to register user')
            }

            ApiResponse(req, res, 201, 'User registered successfully', {
                message: successMessage
            })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof z.ZodError) {
                throw new BadRequestError('Invalid input data')
            }

            throw new InternalServerError('An unexpected error occurred while registering user')
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const validateData = loginSchema.parse(req.body)

            const tokens = await AuthenticationServices.login(validateData)

            if (!tokens) {
                throw new DatabaseError('Failed to login, please check your credentials')
            }

            res.cookie('access_token', tokens.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })

            res.cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })

            ApiResponse(req, res, 200, 'User logged in successfully', {
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken
            })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof z.ZodError) {
                throw new BadRequestError('Invalid input data')
            }

            throw new InternalServerError('An unexpected error occurred while logging in')
        }
    }

    static async logout(req: CustomRequest, res: Response) {
        try {
            const userId: string | undefined = req.user?.id // Get user ID from the request object
            if (!userId) {
                throw new UnauthorizedError('User not authenticated')
            }

            const { refresh_token } = req.cookies as Authenticated
            if (!refresh_token) {
                throw new NotFoundError('No refresh token provided')
            }

            await AuthenticationServices.logout(userId, refresh_token)

            res.clearCookie('access_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 // 1 day
            })

            res.clearCookie('refresh_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 5 // 5 days
            })

            ApiResponse(req, res, 200, 'User logged out successfully', {
                message: 'User logged out successfully'
            })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while logging out: ${error.message}`)
            }
        }
    }

    // todo : implement reset password
    static async resetPassword() {
        try {
            // Logic for resetting password
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while resetting password')
        }
    }

    static async refreshToken(req: CustomRequest, res: Response) {
        const tokens = req.cookies as Authenticated
        const userId: string | undefined = req.user?.id // Get user ID from the request object
        if (!userId) {
            throw new UnauthorizedError('User not authenticated')
        }

        // If the access token is present in the cookies, return it
        if (tokens.access_token) {
            ApiResponse(req, res, 200, 'Access token is valid', {
                access_token: tokens.access_token
            })

            return
        }

        // If the refresh token is present in the cookies, use it to refresh the access token
        if (!tokens.refresh_token) {
            throw new NotFoundError('No refresh token provided')
        }

        const newTokens = await AuthenticationServices.refreshToken(userId, tokens.refresh_token)

        if (!newTokens) {
            throw new DatabaseError('Failed to refresh token, please check your credentials')
        }

        res.cookie('access_token', newTokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        res.cookie('refresh_token', newTokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        ApiResponse(req, res, 200, 'Token refreshed successfully', {
            access_token: newTokens.accessToken,
            refresh_token: newTokens.refreshToken
        })
    }

    static getProfile(req: CustomRequest, res: Response) {
        try {
            const user = req.user // Get user ID from the request object
            if (!user) {
                throw new UnauthorizedError('User not authenticated')
            }

            ApiResponse(req, res, 200, 'User profile retrieved successfully', {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicture: user.avatarImage,
                    createdAt: user.createdAt
                }
            })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while retrieving user profile: ${error.message}`)
            }

            throw new InternalServerError('An unexpected error occurred while retrieving user profile')
        }
    }
}
