import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Comentario } from './comentario.entity.js'

const em = orm.em
em.getRepository(Comentario)

function sanitizeComentarioInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedComentarioInput = {
        cuerpo: req.body.cuerpo,
        usuario: req.body.usuario_id,
        post: req.body.post_id,
    }
 
    Object.keys(req.body.sanitizedComentarioInput).forEach((key) => {
        if (req.body.sanitizedComentarioInput[key] === undefined) {
            delete req.body.sanitizedComentarioInput[key]
        }
    })
 
    next()
}

async function findByUsuario(req: Request, res: Response) {
    try {
        const usuario_id = Number.parseInt(req.params.usuario_id)
        const comentarios = await em.fork().find(
            Comentario,
            { usuario: usuario_id },
            { populate: ['usuario', 'post'] }
        )
        res.status(200).json({ message: 'Comentarios del usuario', data: comentarios })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function findByPost(req: Request, res: Response) {
    try {
        const post_id = Number.parseInt(req.params.post_id)
        const comentarios = await em.fork().find(
            Comentario,
            { post: post_id },
            { populate: ['usuario'] }
        )
        res.status(200).json({ message: 'Comentarios del post', data: comentarios })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function add(req: Request, res: Response) {
    try {
        const forkEm = em.fork()
        const comentario = forkEm.create(Comentario, {
            ...req.body.sanitizedComentarioInput,
            fecha_hora: new Date(),
            likes: 0,
        })
        await forkEm.flush()
        res.status(201).json({ message: 'Comentario creado', data: comentario })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const forkEm = em.fork()
        const comentario = forkEm.getReference(Comentario, id)
        await forkEm.removeAndFlush(comentario)
        res.status(200).json({ message: 'Comentario eliminado con exito' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function like(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const forkEm = em.fork()
        const comentario = await forkEm.findOneOrFail(Comentario, { id })
        comentario.likes = comentario.likes + 1
        await forkEm.flush()
        res.status(200).json({ message: 'Like agregado', data: comentario })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function unlike(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const forkEm = em.fork()
        const comentario = await forkEm.findOneOrFail(Comentario, { id })
        comentario.likes = Math.max(0, comentario.likes - 1)
        await forkEm.flush()
        res.status(200).json({ message: 'Like eliminado', data: comentario })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export {
    sanitizeComentarioInput,
    findByPost,
    findByUsuario,
    add,
    remove,
    like,
    unlike,
}