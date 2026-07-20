import { ValidationError } from './errors.js';
import { isDuplicate } from './utils.js';

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

