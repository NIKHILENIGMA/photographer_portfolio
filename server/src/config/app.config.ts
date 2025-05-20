import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// PORT
export const PORT = process.env.PORT || 3000

// Environment
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DATABASE_URL = process.env.DATABASE_URL || ''
export const isProduction = NODE_ENV === 'production'
export const isDevelopment = NODE_ENV === 'development'

// Access Token Secret and Expiration
export const ACCESS_TOKEN_SECRET = String(process.env.ACCESS_TOKEN_SECRET) || ''
export const ACCESS_TOKEN_EXPIES_IN = process.env.ACCESS_TOKEN_EXPIES_IN ? parseInt(process.env.ACCESS_TOKEN_EXPIES_IN) : 86400

// Refresh Token Secret and Expiration
export const REFRESH_TOKEN_SECRET = String(process.env.REFRESH_TOKEN_SECRET) || ''
export const REFRESH_TOKEN_EXPIES_IN = process.env.REFRESH_TOKEN_EXPIES_IN ? parseInt(process.env.REFRESH_TOKEN_EXPIES_IN) : 43200000
