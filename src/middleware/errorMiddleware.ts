import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error('Error:', err.message);

    res.status(500).json({
        message: err.message || 'Internal Server Error',
    })
}

export default errorMiddleware;