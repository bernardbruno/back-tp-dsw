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

export const comentarioRouter = Router()

comentarioRouter.get('/posts/:post_id/comentarios', findByPost)
comentarioRouter.post('/', sanitizeComentarioInput, add)
comentarioRouter.delete('/:id', remove)
comentarioRouter.post('/:id/like', like)
comentarioRouter.post('/:id/unlike', unlike)
comentarioRouter.get('/usuario/:usuario_id', findByUsuario)