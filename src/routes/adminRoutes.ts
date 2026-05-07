import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import roleMidlleware from "../middleware/roleMiddleware";
import { getTask, getUsers } from "../controllers/adminController";


const router = Router();

router.use(authMiddleware);
router.use(roleMidlleware('admin'));

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator operations
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all registered users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Not an admin)
 *       500:
 *         description: Server error
 */
router.get('/users', getUsers);
/**
 * @swagger
 * /api/admin/taska:
 *   get:
 *     summary: Get all tasks in the system (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Not an admin)
 *       500:
 *         description: Server error
 */
router.get('/tasks', getTask);

export default router;