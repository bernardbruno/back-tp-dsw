import { Router } from 'express'
import { sanitizeCarreraInput, findAll, findOne, add, update, remove } from './carrera.controller.js'
import { autorizarAccion } from '../shared/auth/auth.controller.js'

export const carreraRouter = Router()

carreraRouter.get('/', findAll)
carreraRouter.get('/:id', findOne)
carreraRouter.post('/',     autorizarAccion(true, false),   sanitizeCarreraInput, add)
carreraRouter.put('/:id',   autorizarAccion(true, false),   sanitizeCarreraInput, update)
carreraRouter.patch('/:id', autorizarAccion(true, false),   sanitizeCarreraInput, update)
carreraRouter.delete('/:id',autorizarAccion(true, false),   remove)
