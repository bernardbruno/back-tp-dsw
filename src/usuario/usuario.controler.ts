import { Request, Response, NextFunction } from 'express'
import { orm } from "../shared/db/orm.js";
import { Usuario } from "./usuario.entity.js";

const em = orm.em
em.getRepository(Usuario)


function sanitizeUsuarioInput(req: Request, res: Response, next: NextFunction) {

    req.body.sanitizedUsuarioInput = {        //aca tendrian q hacerse mas validaciones
        nombre_usuario: req.body.nombre_usuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: Usuario.hashPassword(req.body.password),
        pais: req.body.pais,
        user_img: req.body.user_img,
        rol: req.body.rol,
        puntos: req.body.puntos,
        piloto_fav: req.body.piloto_fav || null
    }

        Object.keys(req.body.sanitizedUsuarioInput).forEach((key) => {
        if (req.body.sanitizedUsuarioInput[key] === undefined) {
            delete req.body.sanitizedUsuarioInput[key]
        }
    })

    next()
}

async function findAll(req: Request, res: Response) {
    try {
        const usuarios = await em.find(Usuario, {})
        res.status(200).json({ message: 'Buscar todos los usuarios', data: usuarios })
    } catch (error: any) {
        res.status(500).json({ message: error.message })      //usar nuestros propios msgs de error para los clientes
    }
}
async function findOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const usuario = await em.findOneOrFail(Usuario, { id }, {populate: ['piloto_fav']})
        res
            .status(200)
            .json({ message: 'usuario encontrado', data: usuario })

    } catch (error: any) {
        res.status(500).json({ message: error.message })

    }
}

async function add(req: Request, res: Response) {
    try {
        const userData = req.body.sanitizedUsuarioInput;

        // Verificar si el usuario ya existe
        const existingUser = await em.findOne(Usuario, {
            $or: [
                { nombre_usuario: userData.nombre_usuario },
                { email: userData.email }
            ]
        });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'El usuario o email ya existe' 
            });
        }

        const usuario = em.create(Usuario, req.body)
        await em.flush()
        res.status(201).json({ message: 'usuario creado', data: usuario })

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }

}

async function update(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const usuario = em.getReference(Usuario, id)
        em.assign(usuario, req.body.sanitizedUsuarioInput)
        await em.flush()
        res.status(200).json({ message: 'usuario actualizado con exito' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })

    }

}

async function remove(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const usuario = em.getReference(Usuario, id)
        await em.removeAndFlush(usuario)
        res.status(200).json({ message: 'usuario eliminado con exito' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })


    }
}

async function login(req: Request, res: Response) {
    try {
        const nombre_usuario = req.body.sanitizedUsuarioInput.nombre_usuario
        const password = req.body.sanitizedUsuarioInput.password
        if (!nombre_usuario || !password) {
            return res.status(400).json({
                message: 'Nombre de usuario y contraseña son requeridos'
            });
        }
        const usuario = await em.findOne(Usuario, {
            nombre_usuario
        });
        if (!usuario || usuario.password !== password) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }
        // No enviar la contraseña en la respuesta
        const { password: _, ...usuarioSinPassword } = usuario;
        res.status(200).json({
            message: 'Login exitoso',
            data: usuarioSinPassword
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { sanitizeUsuarioInput, findAll, findOne, add, update, remove, login }