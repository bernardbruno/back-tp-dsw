import { Router } from 'express'
import {
    sanitizeComentarioInput,
    findByPost,
    add,
    remove,
    like,
    unlike,
    findByUsuario,
} from './comentario.controller.js'
import { autorizarAccion, requerirUsuario } from '../shared/auth/auth.controller.js'

export const comentarioRouter = Router()

comentarioRouter.get('/posts/:post_id/comentarios', findByPost)
comentarioRouter.post('/',      requerirUsuario, sanitizeComentarioInput, add)
comentarioRouter.delete('/:id', autorizarAccion(true, true),   remove)
comentarioRouter.post('/:id/like',      requerirUsuario, like)
comentarioRouter.post('/:id/unlike',    requerirUsuario, unlike)
comentarioRouter.get('/usuario/:usuario_id',    findByUsuario)