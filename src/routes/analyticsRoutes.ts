import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';
import { getOverview, getSummary } from '../controllers/analyticsContoller';

const router = Router();

router.use(authMiddleware);

router.get('/summary', getSummary);
router.get('/overview', roleMiddleware('admin'), getOverview);

export default router;
