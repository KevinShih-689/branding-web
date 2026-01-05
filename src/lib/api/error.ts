export class ApiError extends Error {
  public status: string;
  public statusCode: number;

  constructor(message: string, status: string = 'error', statusCode: number = 500) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 'Not Found', 404);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 'Bad Request', 400);
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string) {
    super(message, 'Unauthorized', 401);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, 'Internal Server Error', 500);
  }
}
