import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { getAIPrioritySuggestion, getAITaskSummary } from '../controllers/aiController';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI-powered task assistance (Gemini)
 */

/**
 * @swagger
 * /api/ai/suggest-priority:
 *   post:
 *     summary: Suggest task priority based on description
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI priority suggestion with reasoning
 *       400:
 *         description: Description is required
 *       401:
 *         description: Unauthorized
 */
router.post('/suggest-priority', getAIPrioritySuggestion);

/**
 * @swagger
 * /api/ai/generate-summary:
 *   post:
 *     summary: Generate short task summary from description
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI-generated short task summary
 *       400:
 *         description: Description is required
 *       401:
 *         description: Unauthorized
 */
router.post('/generate-summary', getAITaskSummary);

export default router;
