import express, { Request ,Response , NextFunction } from 'express'
import cors from 'cors'

import 'reflect-metadata'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { errorHandler } from './shared/errors/errorHandler.js' //MANEJO ERRORES

import { usuarioRouter } from './usuario/usuario.routes.js'
import { circuitoRouter } from './circuito/circuito.routes.js'
import { escuderiaRouter } from './escuderia/escuderia.routes.js'
import { pilotoRouter } from './piloto/piloto.routes.js'
import { carreraRouter } from './carrera/carrera.routes.js'
import { resultadoRouter } from './resultado/resultado.routes.js'
import { predictRouter } from './predict/predict.routes.js'



const app = express ()

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,PATCH', // Métodos permitidos
}
app.use(cors(corsOptions)); // Permite que React consuma la API

app.use(express.json())

app.use((req, res, next) =>{
  RequestContext.create(orm.em, next)
})

await syncSchema() //never in production

//middelwares rutas y negocio

app.use('/api/usuario', usuarioRouter)
app.use('/api/circuito', circuitoRouter)
app.use('/api/escuderia', escuderiaRouter)
app.use('/api/piloto', pilotoRouter)
app.use('/api/carrera', carreraRouter)
app.use('/api/resultado', resultadoRouter)
app.use('/api/predict', predictRouter)

app.use((_, res) => {
    return res.status(404).send({ message: 'Recurso no encontrado' })
})

// Registrar middleware centralizado de errores
app.use(errorHandler)

app.listen(3000, ()=> {
    console.log("Server running on http://localhost:3000")
})