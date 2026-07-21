import { ValidationError } from './errors.js';

export function isDuplicate(tasks, title) {
	if (tasks.some(t => t.title === title)) {
		throw new ValidationError("task already exists", 422);
	}
}

export function validateTask(task) {
	let { title, status } = task;
	
	if (typeof title !== "string" || typeof status !== "string") {
		throw new ValidationError("invalid fields");
	}

	title = title.toLowerCase().trim();
	status = status.toLowerCase().trim();

	if (!title) {
		throw new ValidationError("title cannot be empty");
	}
	if (!status) {
		throw new ValidationError("status cannot be empty");
	}

	if (status !== 'pending' && status !== 'completed') {
		throw new ValidationError("invalid status value");
	}

	return { title, status };
}

export function validateID(id) {
	const validID = parseInt(id);

	if (isNaN(validID) || validID <= 0) {
		throw new ValidationError("invalid id");
	}
	return validID;
}
