import express from 'express'
import cors from 'cors'
import { Circuito } from './circuito.js'

const app = express ()

const corsOptions = {               // Lo puso Bruno 
  origin: 'http://localhost:5173', // Permite solicitudes desde el frontend
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
}

app.use(express.json())
app.use(cors(corsOptions)); // Permite que React consuma la API

/*
app.use('/', (req,res)=> {
    res.json({message: 'Hello!'})
})
    */

const circuitos = [
    new Circuito(
        "1",
        "Circuit de Spa-Francorchamps",
        "Stavelot",
        "Bélgica",
        44,
        7.004
    )
]
app.get('/api/circuitos', (req, res) => {
    res.json({data: circuitos})
})

app.get('/api/circuitos/:id', (req, res) => {
    const circuito = circuitos.find((circuito)=> circuito.id === req.params.id)
    if (!circuito){
        res.status(404).send({message: 'No se encontró el circuito'})
    }
    res.json({data: circuito})
})

app.post('/api/circuitos', (req, res) => {
    const {id, nombre, ubicacion, pais, vueltas, longitud_km} = req.body

    const circuito = new Circuito(id, nombre, ubicacion, pais, vueltas, longitud_km)

    circuitos.push(circuito)
    res.status(201).send({message: "Circuito creado con exito", data: circuito})
})


app.listen(3000, ()=> {
    console.log("Server running on http://localhost:3000")
})