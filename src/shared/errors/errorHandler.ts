import { Request, Response, NextFunction } from 'express'
import { ValidationError, NotFoundError as MikroNotFoundError } from '@mikro-orm/core'
import { AppError } from './errors.js'

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  // Errores de la aplicación (nuestros AppError)
  if (err instanceof AppError) {
    const payload: Record<string, unknown> = { message: err.message }
    if (err.extras) payload.extra = err.extras
    res.status(err.status).json(payload)
    return
  }

  // Errores de MikroORM: entidad no encontrada
  if (err instanceof MikroNotFoundError) {
    res.status(404).json({ message: 'Recurso no encontrado' })
    return
  }

  // Errores de validación de MikroORM u otros
  if (err instanceof ValidationError) {
    res.status(400).json({ message: 'Error de validación', details: err.message })
    return
  }

  // Si alguien lanzó un objeto con .status y .message (compatibilidad)
  const anyErr = err as any
  if (anyErr && typeof anyErr.status === 'number' && typeof anyErr.message === 'string') {
    const { status, message, ...rest } = anyErr
    const payload: Record<string, unknown> = { message, ...rest }
    res.status(status).json(payload)
    return
  }

  // Fallback: error inesperado
  // Aquí deberías loguear con tu logger (winston/pino) en vez de console.error
  console.error('Unhandled error', err)
  res.status(500).json({ message: 'Error interno del servidor' })
}
