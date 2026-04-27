import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';
import { getOverview, getSummary } from '../controllers/analyticsContoller';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Task statistics and analytics
 */

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get user's personal task statistics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics summary object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/summary', getSummary);
/**
 * @swagger
 * /api/analytics/overview:
 *   get:
 *     summary: Get system-wide task statistics (Admin only)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System overview analytics object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Not an admin)
 *       500:
 *         description: Server error
 */
router.get('/overview', roleMiddleware('admin'), getOverview);

export default router;
