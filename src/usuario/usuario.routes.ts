import { Router } from 'express'
import { sanitizeUsuarioInput, findAll, findOne, add, update, remove, login, logout} from './usuario.controller.js'
import { requerirAdmin, requerirMismoUsuario } from "../shared/auth/auth.controller.js"

export const usuarioRouter = Router()

usuarioRouter.post('/login',sanitizeUsuarioInput, login);
usuarioRouter.post('/logout', logout);
usuarioRouter.get('/',      requerirAdmin,  findAll)    //seguro que solo el admin puede requerir usuarios?
usuarioRouter.get('/:id',   requerirMismoUsuario,  findOne)
usuarioRouter.post('/',     sanitizeUsuarioInput,   add)
usuarioRouter.put('/:id',   requerirMismoUsuario, sanitizeUsuarioInput, update)
usuarioRouter.patch('/:id', requerirMismoUsuario, sanitizeUsuarioInput, update)
usuarioRouter.delete('/:id',requerirMismoUsuario, remove)
