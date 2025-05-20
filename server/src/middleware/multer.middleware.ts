import { Request } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileFilterCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
    destination: (_: Request, __: Express.Multer.File, cb: DestinationCallback) => {
        const uploadPath = './public/temp'

        // Check if the uploads folder exists, if not create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }

        cb(null, './public/temp')
    },
    filename: (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const ext = path.extname(file.originalname)
        const baseName = path.basename(file.originalname, ext)
        cb(null, baseName + '-' + uniqueSuffix + ext)
    }
})

export const upload = multer({
    storage: fileStorage,
    fileFilter: (_: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const fileTypes = /jpeg|jpg|png/

        const mineTypes = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())

        if (mineTypes && extName) {
            return cb(null, true)
        } else {
            return cb(new Error('Error: Only jpeg, jpg, png files are allowed!'))
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB file size
    }
})
