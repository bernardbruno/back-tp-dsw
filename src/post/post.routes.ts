import { Router } from 'express'
import {
    sanitizePostInput,
    findAll,
    findByUsuario,
    findOne,
    add,
    update,
    remove,
    like,
    unlike,
} from './post.controller.js'

export const postRouter = Router()

postRouter.get('/', findAll)
postRouter.get('/usuario/:usuario_id', findByUsuario)
postRouter.get('/:id', findOne)
postRouter.post('/', sanitizePostInput, add)
postRouter.put('/:id', sanitizePostInput, update)
postRouter.patch('/:id', sanitizePostInput, update)
postRouter.delete('/:id', remove)
postRouter.post('/:id/like', like)
postRouter.post('/:id/unlike', unlike)
