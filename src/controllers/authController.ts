import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ 
                message: 'All fields are required'
            });
            return;
        }

        const { user, token } = await registerUser(name, email, password);
        res.status(201).json({
            message: 'user registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message            
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if(!email || ! password) {
            res.status(400).json({
                message: 'Email and password are required'
            });
            return;
        }

        const { user, token } = await loginUser(email, password);

        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user:{
                id: user._id,
                name: user.name,
                email:user.email,
                role: user.role,
            },
        });
    } catch (error: any) {
        res.status(401).json({
            message: error.message
        });
    }
}