import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { RolUsuario } from "../types/enum.js"
import { JwtPayload } from "../types/interface.js"
import { orm } from "../db/orm.js"
import { Usuario } from "../../usuario/usuario.entity.js"

const em = orm.em
em.getRepository(Usuario)

function generateToken (payload: JwtPayload) {
            
    const tiempoExpiracion = '1h'
    const secret = process.env.JWT_SECRET_KEY

    if(!secret){
        throw new Error('No se pudo encontrar la clave de autorización')
    }
    const token = jwt.sign(payload, secret!, { expiresIn: tiempoExpiracion });
    return token
}

function verifyToken(req: Request, res: Response, next: NextFunction){
    try {
        req.user = null
        const token = req.cookies.accessToken
    
        const secret = process.env.JWT_SECRET_KEY
        if(!secret){
            return res.status(500).json({message: 'No se pudo encontrar la clave de autorizacion'})
        }
        if (token){
            const data = jwt.verify(token, secret!)
            req.user = data
        }
        
    } catch (error: any) {
        if (error.name !== 'TokenExpiredError') {
        return res.status(500).json({ message: error.message });
        }
    }

    next()
}

function identifyAuth(req: Request, res: Response, next: NextFunction){
    const usuario = req.user
    if(usuario){
        return res.status(200).json({message: 'Usuario identificado', data: usuario})
    }
    return res.status(200).json({message: "No hay una sesion de usuario identificada"})
}

function autorizarAccion( admin: boolean, ownUser: boolean){
    return (req: Request, res: Response, next: NextFunction) => {
        
        if (!req.user){
            return res.status(401).json({ message: 'Necesitas permisos para acceder'})
        }
        const rol = req.user.rol

        if (admin && rol === RolUsuario.Admin) {
            return next()
        }
        
        if (ownUser === false) {
            return res.status(403).json({ message: 'No tienes permisos'})
        }
        if (ownUser){  
            const idFromToken = req.user.id
            //const usuario = em.findOneOrFail(Usuario, { id: idFromToken}) innecesario
            if (!idFromToken) {
                return res.status(401).json({ message: 'Necesitas permisos para acceder'})
            }

            let idFromUrl = Number.parseInt(req.params.id)

            if (!idFromUrl) {
                idFromUrl = Number.parseInt(req.params.usuario)
            }

            if (!idFromUrl) {
                idFromUrl = Number.parseInt(req.body.usuario)
            }
            
            if (idFromToken !== idFromUrl) {
                return res.status(403).json({ message: 'No tienes permisos'})
            }
            next()
        }
    }
}

function requerirUsuario(req: Request, res: Response, next: NextFunction){  //solo pide usuario logueado
    if (!req.user){
            return res.status(401).json({ message: 'Necesitas iniciar sesion para acceder'})
        }
    if (!req.user.id) {
        return res.status(401).json({ message: 'No se encontró el id de usuario'})
    }
    next()
}


export {JwtPayload, generateToken, verifyToken, identifyAuth, autorizarAccion, requerirUsuario}