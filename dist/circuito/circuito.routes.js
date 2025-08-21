import { Router } from 'express';
import { sanitizeCircuitoInput, findAll, findOne, add, update, remove } from './circuito.controler.js';
export const circuitoRouter = Router();
circuitoRouter.get('/', findAll);
circuitoRouter.get('/:id', findOne);
circuitoRouter.post('/', sanitizeCircuitoInput, add);
circuitoRouter.put('/:id', sanitizeCircuitoInput, update);
circuitoRouter.patch('/:id', sanitizeCircuitoInput, update);
circuitoRouter.delete('/:id', remove);
//# sourceMappingURL=circuito.routes.js.map