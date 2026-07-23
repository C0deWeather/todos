import { isDuplicate, validateTask } from '../validators.js';
import { ValidationError } from '../error.js';

describe('isDuplicate()', () => {
    test('should throw ValidationError if task title already exists', () => {
        const existingTasks = [{ title: 'Task 1', status: 'pending' }];
        const newTask = { title: 'Task 1', status: 'completed' };
        expect(() => isDuplicate(existingTasks, newTask.title))
        .toThrow(ValidationError);
    });
    
    test('should not throw ValidationError if task title does not exist', () => {
        const existingTasks = [{ title: 'Task 1', status: 'pending' }];
        const newTask = { title: 'Task 2', status: 'completed' };
        expect(isDuplicate(existingTasks, newTask.title)).toBeUndefined();
    });
});

describe('validateTask()', () => {
    test('should throw ValidationError if title is not a string', () => {
        const task = { title: 123, status: 'pending' };
        expect(() => validateTask(task)).toThrow(ValidationError);
    });

    test('should throw ValidationError if status is not a string', () => {
        const task = { title: 'Task 1', status: 123 };
        expect(() => validateTask(task)).toThrow(ValidationError);
    });

    test('should throw ValidationError if title is empty', () => {
        const task = { title: '', status: 'pending' };
        expect(() => validateTask(task)).toThrow(ValidationError);
    });

    test('should throw ValidationError if title is only whitespace', () => {
        const task = { title: '  ', status: 'pending' };
        expect(() => validateTask(task)).toThrow(ValidationError);
    });

    test('should throw ValidationError if status is empty', () => {
        const task = { title: 'Task 1', status: '' };
        expect(() => validateTask(task)).toThrow(ValidationError);
    });

    test('should throw ValidationError if status is only whitespace', () => {
        const task = { title: 'Task 1', status: '  ' };
        expect(() => validateTask(task)).toThrow(ValidationError);
    });

    test(`should throw ValidationError if both title and status
        are empty or only whitespace`, () => {
        const task = { title: '  ', status: '  ' };
        expect(() => validateTask(task)).toThrow(ValidationError);
    });

    test('should throw ValidationError if status is invalid', () => {
        const task = { title: 'Task 1', status: 'in progress' };
        expect(() => validateTask(task)).toThrow(ValidationError);
    });

    test('should return normalized task if valid', () => {
        const task = { title: ' Task 1 ', status: ' Pending ' };
        const normalizedTask = validateTask(task);
        expect(normalizedTask).toEqual({ title: 'task 1', status: 'pending' });
    });
});
