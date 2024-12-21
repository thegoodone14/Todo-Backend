import express from 'express';
import { getTasksByListId, addTaskToUniqueList, toggleTaskStatus, deleteTask } from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes avec chemins standardisés
router.get('/:ID_List/tasks', authenticateToken, getTasksByListId);  // Enlevé le préfixe /list
router.post('/tasks', authenticateToken, addTaskToUniqueList);
router.put('/tasks/:Id_Task/status', authenticateToken, toggleTaskStatus);
router.delete('/tasks/:ID_Task', authenticateToken, deleteTask);

export default router;