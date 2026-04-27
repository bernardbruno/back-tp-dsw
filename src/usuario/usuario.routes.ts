import { Router } from 'express'
import { sanitizeUsuarioInput, findAll, findOne, add, update, remove, login, logout} from './usuario.controller.js'
import { autorizarAccion } from "../shared/auth/auth.controller.js"

export const usuarioRouter = Router()

usuarioRouter.get('/',   autorizarAccion(true, false),  findAll)
usuarioRouter.get('/:id',   autorizarAccion(true, true),  findOne)
usuarioRouter.post('/',     sanitizeUsuarioInput, add)
usuarioRouter.put('/:id',   autorizarAccion(true, true), sanitizeUsuarioInput, update)
usuarioRouter.patch('/:id', autorizarAccion(true, true), sanitizeUsuarioInput, update)
usuarioRouter.delete('/:id',autorizarAccion(true, true), remove)
usuarioRouter.post('/login',sanitizeUsuarioInput, login);
usuarioRouter.post('/logout', logout);
