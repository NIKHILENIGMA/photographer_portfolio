import { z } from 'zod'
import { loginSchema, signupSchema } from '../validators/auth.validators'
import { updateProfileSchema } from '../validators/admin.validator'
import { addPhotoSchema, updatePhotoSchema } from '../validators/photo.validator'
import { contactSchema } from '../validators/contact.validator'

export type SignupData = z.infer<typeof signupSchema>
export type loginData = z.infer<typeof loginSchema>
export type updateProfileData = z.infer<typeof updateProfileSchema>
export type addPhotoData = z.infer<typeof addPhotoSchema>
export type updatePhotoData = z.infer<typeof updatePhotoSchema>
export type contactData = z.infer<typeof contactSchema>

export interface Authenticated {
    access_token: string
    refresh_token: string
}

export enum EApplicationEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production'
}

export type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    cloudinaryPublicId: string | null
    avatarImage: string | null
    createdAt: Date
}
