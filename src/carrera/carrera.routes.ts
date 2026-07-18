import { Router } from 'express'
import { sanitizeCarreraInput, findAll, findOne, add, update, remove } from './carrera.controller.js'
import { requerirAdmin } from '../shared/auth/auth.controller.js'

export const carreraRouter = Router()

carreraRouter.get('/', findAll)
carreraRouter.get('/:id', findOne)
carreraRouter.post('/',     requerirAdmin,   sanitizeCarreraInput, add)
carreraRouter.put('/:id',   requerirAdmin,   sanitizeCarreraInput, update)
carreraRouter.patch('/:id', requerirAdmin,   sanitizeCarreraInput, update)
carreraRouter.delete('/:id',requerirAdmin,   remove)
