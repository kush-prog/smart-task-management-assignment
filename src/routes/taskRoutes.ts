import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { create, getAllTask, getOneTask, updateTask, removeTask } from "../controllers/taskController";

const router = Router();

router.use(authMiddleware);

router.post('/create', create);
router.get('/all', getAllTask);
router.get('/:id', getOneTask);
router.put('/:id', updateTask);
router.delete('/:id', removeTask);

export default router;