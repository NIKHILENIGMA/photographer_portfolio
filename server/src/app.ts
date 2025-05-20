import express, { Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middleware'

const app = express()
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Accept-Encoding'],

    credentials: true // This must be true
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
// app.options('*', cors(corsOptions)); // Handle preflight requests

import adminRoutes from './routes/admin.routes'
import authRoutes from './routes/auth.routes'
import photoRoutes from './routes/photo.routes'
import contactRoutes from './routes/contact.routes'

app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/authentication', authRoutes)
app.use('/api/v1/photos', photoRoutes)
app.use('/api/v1/contacts', contactRoutes)

app.use(notFound)
app.use(errorHandler) // Global error handler

app.get('/health', (_, res: Response) => {
    res.status(200).json({ status: 'ok' })
})

export default app
