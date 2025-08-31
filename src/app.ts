import 'reflect-metadata'
import express, { Request ,Response , NextFunction } from 'express'
import cors from 'cors'
import { circuitoRouter } from './circuito/circuito.routes.js'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'

const app = express ()

const corsOptions = {               // Lo puso Bruno 
  origin: 'http://localhost:5173', // Permite solicitudes desde el frontend
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
}
app.use(cors(corsOptions)); // Permite que React consuma la API

app.use(express.json())

app.use((req, res, next) =>{
  RequestContext.create(orm.em, next)
})

await syncSchema() //never in production

//middelwares rutas y negocio

app.use('/api/circuitos', circuitoRouter)

app.use((_, res) => {
    return res.status(404).send({ message: 'Recurso no encontrado' })
})

app.listen(3000, ()=> {
    console.log("Server running on http://localhost:3000")
})