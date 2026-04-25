import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware"
import { getSystemAnalytics, getUserAnalytics } from "../services/analyticsService"


export const getSummary = async (req: AuthRequest, res: Response) => {
    try {
        const analytics = await getUserAnalytics(req.user!.userId);
        res.status(200).json(analytics);
    } catch (error: any) {
        res.status(500).json({ 
            message: error.message 
        });
    }
};

export const getOverview = async (_req: AuthRequest, res: Response) => {
  try {
    const analytics = await getSystemAnalytics();
    res.status(200).json(analytics);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};