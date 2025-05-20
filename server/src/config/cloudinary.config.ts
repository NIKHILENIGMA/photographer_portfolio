import dotenv from 'dotenv'

dotenv.config()

// Cloudinary configuration
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '1234567890' // Default API key
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'abcdef' // Default API secret
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'demo' // Default cloud name
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL || 'CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@nikhilenigma' // Default Cloudinary URL

