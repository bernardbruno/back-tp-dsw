import { Router } from 'express'
import { sanitizeResultadoInput, sanitizeManyResultadosInput,
         findAll, findAllPorCarrera,
        findOne, addOne, updateOne, remove, addResultadosEnCarrera, updateMany } from './resultado.controller.js'

export const resultadoRouter = Router()

resultadoRouter.get('/', findAll)
resultadoRouter.get('/:carrera', findAllPorCarrera)
resultadoRouter.get('/:carrera/:piloto', findOne)

resultadoRouter.post('/:carrera', sanitizeManyResultadosInput, addResultadosEnCarrera)
resultadoRouter.post('/', sanitizeResultadoInput, addOne)

resultadoRouter.put('/:carrera', sanitizeManyResultadosInput, updateMany)
resultadoRouter.patch('/:carrera', sanitizeManyResultadosInput, updateMany)
resultadoRouter.put('/:carrera/:piloto', sanitizeResultadoInput, updateOne)
resultadoRouter.patch('/:carrera/:piloto', sanitizeResultadoInput, updateOne)

resultadoRouter.delete('/:carrera/:piloto', remove)
