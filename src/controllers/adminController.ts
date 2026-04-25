import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import { getAllUsers, getAllTasks } from "../services/adminService";


export const getUsers = async (_req: AuthRequest, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getTask = async (_req: AuthRequest, res: Response) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch(error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};