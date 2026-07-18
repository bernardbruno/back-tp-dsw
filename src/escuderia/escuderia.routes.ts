import { Router } from 'express'
import { sanitizeEscuderiaInput, findAll, findOne, add, update, remove} from './escuderia.controller.js'
import { autorizarAccion } from '../shared/auth/auth.controller.js'

export const escuderiaRouter = Router()

escuderiaRouter.get('/', findAll)
escuderiaRouter.get('/:id', findOne)
escuderiaRouter.post('/',   autorizarAccion(true, false),   sanitizeEscuderiaInput, add)
escuderiaRouter.put('/:id', autorizarAccion(true, false),   sanitizeEscuderiaInput, update)
escuderiaRouter.patch('/:id', autorizarAccion(true, false),    sanitizeEscuderiaInput, update)
escuderiaRouter.delete('/:id', autorizarAccion(true, false),   remove)
