//ALCANCE PARA AD
import { Router } from 'express'
import { sanitizePredictInput, findAllPorCarrera, findOne,
        add } from './predict.controller.js'

export const predictRouter = Router()

//predictRouter.get('/', findAll)
predictRouter.get('/:carrera', findAllPorCarrera)
predictRouter.get('/:carrera/:usuario', findOne)

predictRouter.post('/:carrera', sanitizePredictInput, add)