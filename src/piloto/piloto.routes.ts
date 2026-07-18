import { Router } from 'express'
import { sanitizePilotoInput, findAll, findAllActivos, findOne, add, update, remove} from './piloto.controller.js'
import { autorizarAccion } from '../shared/auth/auth.controller.js'

export const pilotoRouter = Router()

pilotoRouter.get('/activo', findAllActivos)
pilotoRouter.get('/', findAll)
pilotoRouter.get('/:id', findOne)
pilotoRouter.post('/',      autorizarAccion(true, false),   sanitizePilotoInput, add)
pilotoRouter.put('/:id',    autorizarAccion(true, false),   sanitizePilotoInput, update)
pilotoRouter.patch('/:id',  autorizarAccion(true, false),   sanitizePilotoInput, update)
pilotoRouter.delete('/:id', autorizarAccion(true, false),   remove)
