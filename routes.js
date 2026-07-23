import express from 'express';
import { ValidationError, NotFoundError } from './errors.js';
import { validateTask, validateId } from './validators.js';
import {
    addTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from './data.js';

const router = express.Router();

router.post('/', (req, res) => {
    const newTask = validateTask(req.body);
    const task = addTask(newTask);
    res.status(201).json({
        status: 'success',
        message: 'task successfully created',
        task: task
    });
});

router.get('/', (req, res) => {
    const allTasks = getAllTasks();
    res.json(allTasks);
});

router.get('/:id', (req, res) => {
    const taskId = validateId(req.params.id);
    const task = getTaskById(taskId);
    res.json(task);
});

router.put('/:id', (req, res) => {
    const taskId = validateId(req.params.id);
    const updatedTask = validateTask(req.body);
    updateTask(taskId, updatedTask);
    res.json({
        status: 'success',
        message: 'task successfully updated',
    });
});
router.delete('/:id', (req, res) => {
    const taskId = validateId(req.params.id);
    deleteTask(taskId);
    res.json({
        status: 'success',
        message: 'task succesfully deleted',
    });
});

export default router;

