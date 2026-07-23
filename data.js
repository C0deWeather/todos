import { ValidationError } from './errors.js';
import { isDuplicate } from './validators.js';

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

export function getTaskByID(id) {
  const task = tasks.find(task => task.id === id);
  if (!task) {
    throw new NotFoundError("task not found");
  }
  return task;

  
    
  
