import { Router } from 'express'
import { sanitizeResultadoInput, sanitizeManyResultadosInput,
         findAll, findAllPorCarrera,
        findOne, addOne, updateOne, remove, addResultadosEnCarrera, updateMany } from './resultado.controller.js'
import { autorizarAccion } from '../shared/auth/auth.controller.js'

export const resultadoRouter = Router()

resultadoRouter.get('/',                findAll)
resultadoRouter.get('/:carrera',        findAllPorCarrera)
resultadoRouter.get('/:carrera/:piloto',findOne)

resultadoRouter.post('/:carrera',       autorizarAccion(true, false),    sanitizeManyResultadosInput,    addResultadosEnCarrera)
resultadoRouter.post('/',               autorizarAccion(true, false),    sanitizeResultadoInput,         addOne)

resultadoRouter.put('/:carrera',        autorizarAccion(true, false),    sanitizeManyResultadosInput,    updateMany)
resultadoRouter.patch('/:carrera',      autorizarAccion(true, false),    sanitizeManyResultadosInput,    updateMany)
resultadoRouter.put('/:carrera/:piloto',autorizarAccion(true, false),    sanitizeResultadoInput,        updateOne)
resultadoRouter.patch('/:carrera/:piloto', autorizarAccion(true, false),   sanitizeResultadoInput,      updateOne)

resultadoRouter.delete('/:carrera/:piloto',     autorizarAccion(true, false),     remove)
