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
import { requerirUsuario } from '../shared/auth/auth.controller.js'


export const postRouter = Router()

postRouter.get('/', findAll)
postRouter.get('/usuario/:usuario_id', findByUsuario)
postRouter.get('/:id', findOne)
postRouter.post('/', requerirUsuario, sanitizePostInput, add)
postRouter.put('/:id', requerirUsuario, sanitizePostInput, update)
postRouter.patch('/:id', requerirUsuario, sanitizePostInput, update)
postRouter.delete('/:id', requerirUsuario, remove) //chequear q sea mismo usuario?
postRouter.post('/:id/like', requerirUsuario, like)
postRouter.post('/:id/unlike', requerirUsuario, unlike)
