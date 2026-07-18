import { Router } from 'express'
import { sanitizeCircuitoInput, findAll, findOne, add, update, remove} from './circuito.controller.js'
import { requerirAdmin } from '../shared/auth/auth.controller.js'

export const circuitoRouter = Router()

circuitoRouter.get('/', findAll)
circuitoRouter.get('/:id', findOne)
circuitoRouter.post('/',    requerirAdmin,   sanitizeCircuitoInput, add)
circuitoRouter.put('/:id',  requerirAdmin,   sanitizeCircuitoInput, update)
circuitoRouter.patch('/:id',requerirAdmin,   sanitizeCircuitoInput, update)
circuitoRouter.delete('/:id',requerirAdmin, remove)
