import { Router } from 'express'
import { sanitizeResultadoInput, findAll, findAllPorCarrera,
        findOne, addOne, update, remove, addResultadosEnCarrera } from './resultado.controller.js'

export const resultadoRouter = Router()

resultadoRouter.get('/', findAll)
resultadoRouter.get('/:carrera', findAllPorCarrera)
resultadoRouter.get('/:carrera/:piloto', findOne)
resultadoRouter.post('/:carrera', sanitizeResultadoInput, addResultadosEnCarrera)
resultadoRouter.post('/', sanitizeResultadoInput, addOne)
resultadoRouter.put('/:carrera/:piloto', sanitizeResultadoInput, update)
resultadoRouter.patch('/:carrera/:piloto', sanitizeResultadoInput, update)
resultadoRouter.delete('/:carrera/:piloto', remove)
