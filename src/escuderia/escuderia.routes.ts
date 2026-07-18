import { Router } from 'express'
import { sanitizeEscuderiaInput, findAll, findOne, add, update, remove} from './escuderia.controller.js'
import { requerirAdmin } from '../shared/auth/auth.controller.js'

export const escuderiaRouter = Router()

escuderiaRouter.get('/', findAll)
escuderiaRouter.get('/:id', findOne)
escuderiaRouter.post('/',   requerirAdmin,   sanitizeEscuderiaInput, add)
escuderiaRouter.put('/:id', requerirAdmin,   sanitizeEscuderiaInput, update)
escuderiaRouter.patch('/:id',  requerirAdmin,   sanitizeEscuderiaInput, update)
escuderiaRouter.delete('/:id', requerirAdmin,   remove)
