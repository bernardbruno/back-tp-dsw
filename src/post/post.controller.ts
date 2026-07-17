import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Post } from './post.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'

const em = orm.em
em.getRepository(Post)

async function sanitizePostInput(req: Request, res: Response, next: NextFunction) {
    
    const usuario = await em.findOneOrFail(Usuario, {id: req.user.id})
    

    req.body.sanitizedPostInput = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        usuario: usuario,
    }

    Object.keys(req.body.sanitizedPostInput).forEach((key) => {
        if (req.body.sanitizedPostInput[key] === undefined) {
            delete req.body.sanitizedPostInput[key]
        }
    })

    next()
}

async function findAll(req: Request, res: Response) {
    try {
        const posts = await em.fork().find(
            Post,
            {},
            { populate: ['usuario', 'comentarios', 'comentarios.usuario'] }
        )
        res.status(200).json({ message: 'Buscar todos los posts', data: posts })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function findByUsuario(req: Request, res: Response) {
    try {
        const usuario_id = Number.parseInt(req.params.usuario_id)
        const posts = await em.fork().find(
            Post,
            { usuario: usuario_id },
            { populate: ['usuario', 'comentarios', 'comentarios.usuario'] }
        )
        res.status(200).json({ message: 'Posts del usuario', data: posts })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const post = await em.fork().findOneOrFail(
            Post,
            { id },
            { populate: ['usuario', 'comentarios', 'comentarios.usuario'] }
        )
        res.status(200).json({ message: 'Post encontrado', data: post })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function add(req: Request, res: Response) {
    try {
        const forkEm = em.fork()
        const post = forkEm.create(Post, {
            ...req.body.sanitizedPostInput,
            fecha_hora: new Date(),
            likes: 0,
        })
        await forkEm.flush()
        res.status(201).json({ message: 'Post creado', data: post })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const forkEm = em.fork()
        const post = await forkEm.findOneOrFail(Post, { id })
        forkEm.assign(post, req.body.sanitizedPostInput)
        await forkEm.flush()
        const postActualizado = await forkEm.findOneOrFail(Post, { id }, { populate: ['usuario', 'comentarios', 'comentarios.usuario'] })
        res.status(200).json({ message: 'Post actualizado', data: postActualizado })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const forkEm = em.fork()
        const post = forkEm.getReference(Post, id)
        await forkEm.removeAndFlush(post)
        res.status(200).json({ message: 'Post eliminado con exito' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function like(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const forkEm = em.fork()
        const post = await forkEm.findOneOrFail(Post, { id })
        post.likes = post.likes + 1
        await forkEm.flush()
        res.status(200).json({ message: 'Like agregado', data: post })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function unlike(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const forkEm = em.fork()
        const post = await forkEm.findOneOrFail(Post, { id })
        post.likes = Math.max(0, post.likes - 1)
        await forkEm.flush()
        res.status(200).json({ message: 'Like eliminado', data: post })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export {
    sanitizePostInput,
    findAll,
    findByUsuario,
    findOne,
    add,
    update,
    remove,
    like,
    unlike,
}