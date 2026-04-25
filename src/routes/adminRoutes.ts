import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import roleMidlleware from "../middleware/roleMiddleware";
import { getTask, getUsers } from "../controllers/adminController";


const router = Router();

router.use(authMiddleware);
router.use(roleMidlleware('admin'));

router.get('/users', getUsers);
router.get('/taska', getTask);

export default router;