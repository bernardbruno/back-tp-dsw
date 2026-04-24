import Router from "express"
import { identifyAuth } from './auth.controller.js'
    
export const authRouter = Router()

authRouter.get('/', identifyAuth)