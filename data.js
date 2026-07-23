import { NotFoundError, ValidationError } from './errors.js';

const tasks = [];
let nextId = 1;

export function addTask(task) {
  if (tasks.some(t => t.title === task.title)) {
    throw new ValidationError("task with this title already exists");
  }
  const newTask = {
    id: nextId++,
    ...task
  };
  tasks.push(newTask);
  return newTask;
}

export function getAllTasks() {
  return structuredClone(tasks);
}

export function getTaskById(id) {
  const task = tasks.find(task => task.id === id);
  if (!task) {
    throw new NotFoundError("task not found");
  }
  return task;
}

export function updateTask(id, updatedTask) {
  const currentTask = tasks.find(t => t.id === id);
  if (!currentTask) {
    throw new NotFoundError("task not found");
  }
  currentTask.title = updatedTask.title;
  currentTask.status = updatedTask.status;
  return currentTask;
}

export function deleteTask(id) {
  const indexInArray = tasks.findIndex(t => t.id === id);
  if (indexInArray === -1) {
    throw new NotFoundError("task not found");
  }
  tasks.splice(indexInArray, 1);
}
