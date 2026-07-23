export class ValidationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends ValidationError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}
