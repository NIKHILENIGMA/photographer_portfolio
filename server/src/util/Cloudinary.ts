import { v2 as cloudinary } from 'cloudinary'
import { unlinkSync } from 'node:fs'
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config/cloudinary.config'

interface CloudinaryOptions {
    folder?: string // Optional: specify a folder in Cloudinary
    overwrite?: boolean // Optional: overwrite existing image with the same public ID
    public_id?: string
}

/**
 * Configures Cloudinary with the Cloudinary API key, API secret, and cloud name.
 *
 * @param cloudinaryConfig - The Cloudinary configuration object.
 * @returns void
 */
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

/**
 * Uploads an image to Cloudinary.
 *
 * @param filePath - The path to the image file to upload.
 * @returns A promise that resolves with the result of the upload.
 */

export const uploadOnCloudinary = async (localPath: string, options: CloudinaryOptions): Promise<string> => {
    try {
        const response = await cloudinary.uploader.upload(localPath, {
            folder: options.folder, // Optional: specify a folder in Cloudinary
            overwrite: options.overwrite, // Optional: overwrite existing image with the same public ID
            public_id: options.public_id // Optional: specify a public ID for the image
        })

        unlinkSync(localPath) // Delete the local file after uploading
        return response.secure_url
    } catch (error) {
        unlinkSync(localPath) // Delete the local file in case of an error
        console.error('Error uploading to Cloudinary:', error)
        throw new Error('Failed to upload image to Cloudinary')
    }
}

/**
 * Deletes an image from Cloudinary.
 *
 * @param publicId - The public ID of the image to delete.
 * @returns A promise that resolves with the result of the deletion.
 */

export const removeFromCloudinary = async (publicId: string): Promise<void> => {
    await cloudinary.uploader.destroy(publicId)
}
