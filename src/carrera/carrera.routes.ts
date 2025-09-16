import { Router } from 'express'
import { sanitizeCarreraInput, findAll, findOne, add, update, remove } from './carrera.controller.js'

export const carreraRouter = Router()

carreraRouter.get('/', findAll)
carreraRouter.get('/:id', findOne)
carreraRouter.post('/', sanitizeCarreraInput, add)
carreraRouter.put('/:id', sanitizeCarreraInput, update)
carreraRouter.patch('/:id', sanitizeCarreraInput, update)
carreraRouter.delete('/:id', remove)
