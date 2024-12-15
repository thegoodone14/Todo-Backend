
import express from 'express';
import { getTasksByListId, addTaskToUniqueList, toggleTaskStatus, deleteTask } from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour récupérer les tâches d'une liste spécifique
router.get('/:ID_List/tasks', authenticateToken, getTasksByListId);
router.post("/tasks", authenticateToken, addTaskToUniqueList);
router.put('/:Id_Task', authenticateToken, toggleTaskStatus);
router.delete('/tasks/:ID_Task', authenticateToken, deleteTask)

export default router;
