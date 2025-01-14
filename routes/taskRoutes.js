import express from 'express';
import { addTaskToUniqueList, getTasksByListId, toggleTaskStatus, deleteTask, updateTaskPriority } from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes protégées par authentification
router.use(authenticateToken);

// Ajouter une tâche
router.post('/tasks', addTaskToUniqueList);

// Obtenir toutes les tâches d'une liste avec filtres et recherche
router.get('/:ID_List/tasks', getTasksByListId);

// Mettre à jour le statut d'une tâche
router.put('/tasks/:Id_Task/status', toggleTaskStatus);

// Mettre à jour la priorité d'une tâche
router.put('/tasks/:Id_Task/priority', updateTaskPriority);

// Supprimer une tâche
router.delete('/tasks/:ID_Task', deleteTask);

export default router;