import { Request, Response, NextFunction } from 'express'

const NotFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: `Route does not found: ${req.originalUrl}`,
        status: 404
    })
}

export default NotFound
