const tasks = [];
let taskID = 0;

export function addTask(task) {
  if (tasks.some(t => t.title === task.title)) {
    throw new ValidationError("task already exists");
  }
  
  taskID++;
  tasks.push({
    id: taskID,
    ...task
  });
  return taskID;  
}

