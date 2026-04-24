import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface JwtPayload {
    id: number,
    nombre_usuario: string
}

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

export {generateToken, verifyToken, identifyAuth}