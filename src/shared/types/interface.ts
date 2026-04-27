import { RolUsuario } from "./enum.js"

interface JwtPayload {
    id: number,
    nombre_usuario: string,
    rol: RolUsuario
}

export {JwtPayload}