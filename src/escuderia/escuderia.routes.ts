import { Router } from 'express'
import { sanitizeEscuderiaInput, findAll, findOne, add, update, remove } from './escuderia.controler.js'

export const escuderiaRouter = Router()

escuderiaRouter.get('/', findAll)
escuderiaRouter.get('/:id', findOne)
escuderiaRouter.post('/', sanitizeEscuderiaInput, add)
escuderiaRouter.put('/:id', sanitizeEscuderiaInput, update)
escuderiaRouter.patch('/:id', sanitizeEscuderiaInput, update)
escuderiaRouter.delete('/:id', remove)

/*
import { Router } from 'express'
import { sanitizeEscuderiaInput, findAll, findOne, add, update, remove } from './escuderia.controler.js'
import { asyncHandler } from '../shared/asyncHandler.js'

export const escuderiaRouter = Router()

escuderiaRouter.get('/', asyncHandler(findAll))
escuderiaRouter.get('/:id', asyncHandler(findOne))
escuderiaRouter.post('/', sanitizeEscuderiaInput, asyncHandler(add))
escuderiaRouter.put('/:id', sanitizeEscuderiaInput, asyncHandler(update))
escuderiaRouter.patch('/:id', sanitizeEscuderiaInput, asyncHandler(update))
escuderiaRouter.delete('/:id', asyncHandler(remove))
*/
