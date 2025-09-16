import { Router } from 'express'
import { sanitizeResultadoInput, findAll, findAllPorCarrera,
        findOne, add, update, remove } from './resultado.controller.js'

export const resultadoRouter = Router()

resultadoRouter.get('/', findAll)
resultadoRouter.get('/:carrera', findAllPorCarrera)
resultadoRouter.get('/:carrera/:piloto', findOne)
resultadoRouter.post('/', sanitizeResultadoInput, add)
resultadoRouter.put('/:carrera/:piloto', sanitizeResultadoInput, update)
resultadoRouter.patch('/:carrera/:piloto', sanitizeResultadoInput, update)
resultadoRouter.delete('/:carrera/:piloto', remove)
