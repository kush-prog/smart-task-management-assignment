import  { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { createTask, deleteTask, getTaskById, getUserTask, updateTask as updateTaskService } from "../services/taskService";

export const create = async (req: AuthRequest, res: Response) => {
    try{
        const task = await createTask(req.body, req.user!.userId);
        res.status(201).json({
            message: "Task created successfully",
        }); 
    } catch(error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const getAllTask = async (req: AuthRequest, res: Response) => {
    try {
        const tasks = await getUserTask(req.user!.userId);
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};

export const getOneTask = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: 'Task ID is required' });
            return;
        }
        const task = await getTaskById(id, req.user!.userId);
        res.status(200).json(task);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: 'Task ID is required' });
            return;
        }
        const task = await updateTaskService(id, req.user!.userId, req.body);
        res.status(200).json(task);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const removeTask = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: 'Task ID is required' });
            return;
        }
        await deleteTask(id, req.user!.userId);
        res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};