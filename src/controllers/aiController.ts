import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { suggestPriority, generateTaskSummary } from '../services/aiService';

export const getAIPrioritySuggestion = async (req: AuthRequest, res: Response) => {
  try {
    const { description } = req.body;

    if (!description) {
      res.status(400).json({ message: 'Task description is required' });
      return;
    }

    const suggestion = await suggestPriority(description);
    res.status(200).json(suggestion);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAITaskSummary = async (req: AuthRequest, res: Response) => {
  try {
    const { description } = req.body;

    if (!description) {
      res.status(400).json({ message: 'Task description is required' });
      return;
    }

    const summary = await generateTaskSummary(description);
    res.status(200).json(summary);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
