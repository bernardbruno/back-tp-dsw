import { Router } from 'express'
import { sanitizePilotoInput, findAll, findAllActivos, findOne, add, update, remove} from './piloto.controller.js'
import { requerirAdmin } from '../shared/auth/auth.controller.js'

export const pilotoRouter = Router()

pilotoRouter.get('/activo', findAllActivos)
pilotoRouter.get('/', findAll)
pilotoRouter.get('/:id', findOne)
pilotoRouter.post('/',      requerirAdmin,   sanitizePilotoInput, add)
pilotoRouter.put('/:id',    requerirAdmin,   sanitizePilotoInput, update)
pilotoRouter.patch('/:id',  requerirAdmin,   sanitizePilotoInput, update)
pilotoRouter.delete('/:id', requerirAdmin,   remove)
