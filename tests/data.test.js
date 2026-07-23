import { NotFoundError, ValidationError } from "../errors.js";
import {
    addTask,
    getTaskById,
    updateTask,
    deleteTask,
    getAllTasks,
} from "../data.js";

describe('Adding tasks', () => {
    it('addTask:should add a new task', () => {
        const task = { title: 'task 1', status: 'pending' };
        const addedTask = addTask(task);
        expect(addedTask.id).toBe(1);
        expect(addedTask.title).toBe('task 1');
        expect(addedTask.status).toBe('pending');
    });

    it('addTask: should throw ValidationError if task with the same title already exists', () => {
        const task = { title: 'task 1', status: 'pending' };
        expect(() => addTask(task)).toThrow(ValidationError);
    });
});

describe('Retrieving tasks', () => {
    it('getAllTasks: should return all tasks', () => {
        addTask({ title: 'task 2', status: 'pending' });
        addTask({ title: 'task 3', status: 'completed' });
        const tasks = getAllTasks();
        expect(tasks.length).toBe(3);
        expect(tasks).toEqual([
            { id: 1, title: 'task 1', status: 'pending' },
            { id: 2, title: 'task 2', status: 'pending' },
            { id: 3, title: 'task 3', status: 'completed' }
        ]);
    });

    it('getTaskById: should return the task with the given id', () => {
        const task = getTaskById(1);
        expect(task).toEqual({ id: 1, title: 'task 1', status: 'pending' });
    });
    it('getTaskById: should throw NotFoundError if task with given id does not exist', () => {
        expect(() => getTaskById(999)).toThrow(NotFoundError);
    });
});

describe('Updating and deleting tasks', () => {
    it('updateTask: should update the task with the given id', () => {
        const updatedTask = updateTask(1, { title: 'updated task 1', status: 'completed' });
        expect(updatedTask.title).toBe('updated task 1');
        expect(updatedTask.status).toBe('completed');
    });

    it('updateTask: should throw NotFoundError if task with given id does not exist', () => {
        expect(() => updateTask(999, {
            title: 'Updated Task',
            status: 'completed'
        })).toThrow(NotFoundError);
    });

    it('deleteTask: should delete the task with the given id', () => {
        deleteTask(1);
        expect(() => getTaskById(1)).toThrow(NotFoundError);
    });

    it('deleteTask: should throw NotFoundError if task with given id does not exist', () => {
        expect(() => deleteTask(999)).toThrow(NotFoundError);
    });
});
