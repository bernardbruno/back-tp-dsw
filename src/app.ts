import express, { Request ,Response , NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';


import 'reflect-metadata'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'

import { usuarioRouter } from './usuario/usuario.routes.js'
import { circuitoRouter } from './circuito/circuito.routes.js'
import { escuderiaRouter } from './escuderia/escuderia.routes.js'
import { pilotoRouter } from './piloto/piloto.routes.js'
import { carreraRouter } from './carrera/carrera.routes.js'
import { resultadoRouter } from './resultado/resultado.routes.js'
import { predictRouter } from './predict/predict.routes.js'
import { verifyToken } from './shared/auth/auth.controller.js';
import { authRouter } from './shared/auth/auth.routes.js';


dotenv.config()
import { postRouter } from './post/post.routes.js'
import { comentarioRouter } from './comentario/comentario.routes.js'

const app = express ()

const UrlFront = process.env.FRONT_URL

const corsOptions = {
  origin: UrlFront,
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}
app.use(cors(corsOptions)); // Permite que React consuma la API

app.use(express.json())

app.use(cookieParser())

app.use((req, res, next) =>{
  RequestContext.create(orm.em, next)
})

await syncSchema() //never in production

//middelwares rutas y negocio

app.use(verifyToken)

app.use('/api/auth', authRouter)
app.use('/api/usuario', usuarioRouter)
app.use('/api/circuito', circuitoRouter)
app.use('/api/escuderia', escuderiaRouter)
app.use('/api/piloto', pilotoRouter)
app.use('/api/carrera', carreraRouter)
app.use('/api/resultado', resultadoRouter)
app.use('/api/predict', predictRouter)
app.use('/api/post', postRouter)
app.use('/api/comentario', comentarioRouter)

app.get('/debug-cookie', (req, res) => {
  console.log('Cookies recibidas:', req.cookies);  // { accessToken: 'jwt...' }
  res.json({ cookies: req.cookies });
});

app.use((_, res) => {
    return res.status(404).send({ message: 'Recurso no encontrado' })
})

const port = process.env.PORT
const url = process.env.BACK_URL 

app.listen(port, ()=> {
    console.log(`Server running on ${url}:${port}`)
})