import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'No token provided, access denied'
            });
            return;
        }

        // Extracting token from header
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Token is malformed' });
            return;
        }
        // Verfying token
        const secret = process.env.JWT_SECRET;
        if(!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Attach user info to request
        const decodedToken = jwt.verify(token, secret) as unknown as { userId: string, role: string };
        // Pass control to the next middleware
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json(
            { message: 'Invalid or required token' });
    }
};

export default authMiddleware;
