import { Router } from 'express'
import { sanitizeCircuitoInput, findAll, findOne, add, update, remove} from './circuito.controller.js'
import { autorizarAccion } from '../shared/auth/auth.controller.js'

export const circuitoRouter = Router()

circuitoRouter.get('/', findAll)
circuitoRouter.get('/:id', findOne)
circuitoRouter.post('/',    autorizarAccion(true, false),   sanitizeCircuitoInput, add)
circuitoRouter.put('/:id',  autorizarAccion(true, false),   sanitizeCircuitoInput, update)
circuitoRouter.patch('/:id',autorizarAccion(true, false),   sanitizeCircuitoInput, update)
circuitoRouter.delete('/:id', autorizarAccion(true, false), remove)
