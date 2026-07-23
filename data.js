import { ValidationError } from './errors.js';

const tasks = [];
const nextId = 1;

export function addTask(task) {
  tasks.push({
    id: nextId++,
    ...task
  });  
}

export function getTasks() {
  return structuredClone(tasks);
}

export function getTaskById(id) {
  const task = tasks.find(task => task.id === id);
  if (!task) {
    throw new NotFoundError("task not found");
  }
  return task;

export function updateTask(id, updatedTask) {
  const currentTask = tasks.find(t => t.id === id);
  if (!currentTask) {
    throw new NotFoundError("task not found");
  }
  currentTask.title = updatedTask.title;
  currentTask.status = updatedTask.status;
}

export function deleteTask(id) {
  indexInArray = tasks.findIndex(t => t.id === id);
  if (!indexInArray) {
    throw new NotFoundError("task not found");
  }
  tasks.splice(indexInArray, 1);
}
