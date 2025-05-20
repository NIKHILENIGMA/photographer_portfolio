import { z } from 'zod'

export const contactSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Phone number is required'),
    companyName: z.string().optional(),
    message: z.string().min(5, 'Message is too short')
})
