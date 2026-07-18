import { Router } from 'express'
import { sanitizeResultadoInput, sanitizeManyResultadosInput,
         findAll, findAllPorCarrera,
        findOne, addOne, updateOne, remove, addResultadosEnCarrera, updateMany } from './resultado.controller.js'
import { requerirAdmin } from '../shared/auth/auth.controller.js'

export const resultadoRouter = Router()

resultadoRouter.get('/',                findAll)
resultadoRouter.get('/:carrera',        findAllPorCarrera)
resultadoRouter.get('/:carrera/:piloto',findOne)

resultadoRouter.post('/:carrera',       requerirAdmin,    sanitizeManyResultadosInput,    addResultadosEnCarrera)
resultadoRouter.post('/',               requerirAdmin,    sanitizeResultadoInput,         addOne)

resultadoRouter.put('/:carrera',        requerirAdmin,    sanitizeManyResultadosInput,    updateMany)
resultadoRouter.patch('/:carrera',      requerirAdmin,    sanitizeManyResultadosInput,    updateMany)
resultadoRouter.put('/:carrera/:piloto',requerirAdmin,    sanitizeResultadoInput,        updateOne)
resultadoRouter.patch('/:carrera/:piloto', requerirAdmin,   sanitizeResultadoInput,      updateOne)

resultadoRouter.delete('/:carrera/:piloto',     requerirAdmin,     remove)
