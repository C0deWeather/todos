import { ValidationError } from './errors.js';
import { isDuplicate } from './validators.js';

const tasks = [];
let taskID = 0;

export function addTask(task) {
  isDuplicate(tasks, task.title);
  taskID++;
  tasks.push({
    id: taskID,
    ...task
  });
  return taskID;  
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

  
    
  
