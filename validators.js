import { ValidationError } from './errors.js';

export function validateTask(task) {
	let { title, status } = task;
	
	if (typeof title !== "string" || typeof status !== "string") {
		throw new ValidationError("invalid fields");
	}

	title = title.toLowerCase().trim();
	status = status.toLowerCase().trim();

	if (!title || !status) {
		throw new ValidationError("one or more fields are empty");
	}
	
	if (status !== 'pending' && status !== 'completed') {
		throw new ValidationError("invalid status value");
	}

	return { title, status };
}

export function validateId(id) {
	const validId = Number(id);

	if (!Number.isInteger(validId) || validId <= 0) {
		throw new ValidationError("invalid id");
	}
	return validId;
}
