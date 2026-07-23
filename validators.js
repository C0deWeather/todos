<<<<<<< Updated upstream
import { ValidationError } from './errors.js';
=======
import { ValidationError } from './error.js';
>>>>>>> Stashed changes

export function validateTask(task) {
	let { id, title, status } = task;

	if (id) {
		if (!Number.isInteger(id) || id <= 0) {
			throw new ValidationError("invalid id");
		}
	}
	
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

	return { id, title, status };
}

export function validateId(id) {
	const validId = Number(id);

	if (!Number.isInteger(ValidId) || id <= 0) {
		throw new ValidationError("invalid id");
	}
	return validId;
}
