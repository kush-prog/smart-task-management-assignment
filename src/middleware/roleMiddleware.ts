import { NextFunction, Response } from "express";
import { AuthRequest } from "./authMiddleware"


const roleMidlleware = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if(!req.user) {
            res.status(401).json({
                message: 'Not authenticated.'
            });
            return;
        }

        if(!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                message: 'Access denied, not have permissions for this action.'
            });
            return;
        }

        next();;
    };
};

export default roleMidlleware;