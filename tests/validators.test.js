import { validateId, validateTask } from '../validators.js';
import { ValidationError } from '../errors.js';

describe('validateId()', () => {
    test('should throw ValidationError if id is not a number', () => {
        expect(() => validateId('abc')).toThrow(ValidationError);
    });

    test('should throw ValidationError if id is a partial number', () => {
        expect(() => validateId('abc123')).toThrow(ValidationError);
        expect(() => validateId('1  9 ')).toThrow(ValidationError);
    });

    test('should throw ValidationError if id is not an integer', () => {
        expect(() => validateId(1.5)).toThrow(ValidationError);
    });

    test('should throw ValidationError if id is less than or equal to 0', () => {
        expect(() => validateId(-1)).toThrow(ValidationError);
        expect(() => validateId(0)).toThrow(ValidationError);
        expect(() => validateId('-5')).toThrow(ValidationError);
        expect(() => validateId('0')).toThrow(ValidationError);
    });

    test('should return the valid id if id is a positive integer', () => {
        expect(validateId(5)).toBe(5);
        expect(validateId('10')).toBe(10);
        expect(validateId('  15  ')).toBe(15);
    });
})

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

    test(
    'should throw ValidationError if both title and status ' +
    'are empty or only whitespace',
    () => {
        const task = { title: '  ', status: '  ' };
        expect(() => validateTask(task)).toThrow(ValidationError);
    }
);
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
