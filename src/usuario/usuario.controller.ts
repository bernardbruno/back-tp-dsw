import { Request, Response, NextFunction } from 'express'
import { orm } from "../shared/db/orm.js";
import { Usuario } from "./usuario.entity.js";
import jwt from "jsonwebtoken";


const em = orm.em
em.getRepository(Usuario)


function sanitizeUsuarioInput(req: Request, res: Response, next: NextFunction) {
    //aca tendrian q hacerse mas validaciones
    if (req.body.nombre_usuario) {
        if (req.body.nombre_usuario.length < 4 || req.body.nombre_usuario.length > 20) {
            return res.status(400).json({ 
                message: 'El nombre de usuario debe tener entre 4 y 20 caracteres' 
            });
        }
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return res.status(400).json({ 
                message: 'La contraseña debe tener mínimo 6 caracteres' 
            });
        }
    }

    if (req.body.email) {
        const emailRegex = /^\S+@\S+$/i;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ 
                message: 'Email inválido' 
            });
        }
    }

    req.body.sanitizedUsuarioInput = {        
        nombre_usuario: req.body.nombre_usuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: Usuario.hashPassword(req.body.password),
        pais: req.body.pais,
        user_img: req.body.user_img,
        rol: req.body.rol,
        puntos: req.body.puntos,
        piloto_fav: req.body.piloto_fav || null //sacar el null!
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

        // Validar campos requeridos
        if (!userData.nombre_usuario || !userData.email || !userData.password) {
            return res.status(400).json({
                message: 'Nombre de usuario, email y contraseña son requeridos'
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await em.findOne(Usuario, {
            $or: [
                { nombre_usuario: userData.nombre_usuario },
                { email: userData.email }
            ]
        });
        if (existingUser) {
            if (existingUser.nombre_usuario === userData.nombre_usuario) {
                return res.status(409).json({
                    message: 'Este nombre de usuario ya está registrado'
                });
            } else {
                return res.status(409).json({
                    message: 'Este email ya está registrado'
                });
            }
        }

        const usuario = em.create(Usuario, userData)
        await em.flush()

        const { password, ...usuarioSinPassword } = usuario
        
        res.status(201).json({ message: 'usuario creado', data: usuarioSinPassword})

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
        const { nombre_usuario, password } = req.body.sanitizedUsuarioInput;
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
        console.log(usuario.password)
        console.log(password)
        
        console.log(usuario.password === password)
        if (usuario.password !== password) {
            return res.status(401).json({
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // No enviar la contraseña en la respuesta
        const { password: _, ...usuarioSinPassword } = usuario;
        const jwtKey = process.env.JWT_SECRET_KEY
        if(!jwtKey){
            return res.status(500).json({message: 'No se pudo encontrar la clave de autorización'})
        }
        
        const token = jwt.sign({ id: usuario.id, nombre_usuario: usuario.nombre_usuario, rol: usuario.rol },
                                 process.env.JWT_SECRET_KEY!,
                                {expiresIn: '1h'});
        res
            .status(200)
            .cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.HTTPS_USE === 'true',
                sameSite: 'strict',
                maxAge: 2 * 60 * 60 * 1000
            })
            .json({
            message: 'Login exitoso',
            data: usuarioSinPassword
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

function logout(req: Request, res: Response, next: NextFunction){
    try{
        res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
        });

        res.json({ message: 'Logout exitoso' });
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

export { sanitizeUsuarioInput, findAll, findOne, add, update, remove, login, logout }