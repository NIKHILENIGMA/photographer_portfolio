import jwt, { SignOptions } from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIES_IN, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIES_IN } from '../config/app.config'

export function generatePayload(id: string) {
    return {
        iss: 'Siddhesh Sawant',
        sub: id
    }
}

export function generateAccessToken(payload: object) {
    if (ACCESS_TOKEN_SECRET === '') {
        return 'Can not get the access token secret'
    }
    const options: SignOptions = {
        expiresIn: ACCESS_TOKEN_EXPIES_IN // Use the string directly
    }

    return jwt.sign(payload, ACCESS_TOKEN_SECRET as string, options)
}
export function generateRefreshToken(payload: object) {
    if (REFRESH_TOKEN_SECRET === '') {
        return 'Can not get the refresh token secret'
    }

    const options: SignOptions = {
        expiresIn: REFRESH_TOKEN_EXPIES_IN // Use the string directly
    }

    return jwt.sign(payload, REFRESH_TOKEN_SECRET!, options)
}

export function verifyToken(token: string, secret: string): jwt.JwtPayload {
    const decoded = jwt.verify(token, secret)
    if (typeof decoded === 'string') {
        throw new Error('Invalid token payload: expected JwtPayload but got string')
    }
    return decoded
}
