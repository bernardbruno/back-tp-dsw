//ALCANCE PARA AD
import { Router } from 'express'
import { sanitizePredictInput, findAllPorCarrera,
        findOne,        add } from './predict.controller.js'
import { requerirUsuario } from '../shared/auth/auth.controller.js'

export const predictRouter = Router()

//predictRouter.get('/', findAll)
predictRouter.get('/:carrera', findAllPorCarrera) //autorizaciones ver?
predictRouter.get('/:carrera/:usuario', findOne)

predictRouter.post('/:carrera', requerirUsuario, sanitizePredictInput, add)