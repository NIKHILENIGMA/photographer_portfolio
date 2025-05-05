import dotenv from 'dotenv';

dotenv.config();


export const cloudinaryConfig = {
    CLOUDINARY_URL: process.env.CLOUDINARY_URL || 'https://api.cloudinary.com/v1_1/demo',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '1234567890',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'abcdef',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'demo'
}