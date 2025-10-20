export class AppError extends Error {
  public status: number;
  public extras?: Record<string, unknown>;  //quitar record??

  constructor(message: string, status = 400, extras?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.extras = extras;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundAppError extends AppError {
  constructor(message = 'Recurso no encontrado', extras?: Record<string, unknown>) {
    super(message, 404, extras);
  }
}

export class BadRequestAppError extends AppError {
  constructor(message = 'Solicitud inválida', extras?: Record<string, unknown>) {
    super(message, 400, extras);
  }
}

export class ConflictAppError extends AppError {
  constructor(message = 'Conflicto de recurso', extras?: Record<string, unknown>) {
    super(message, 409, extras);
  }
}
