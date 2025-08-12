import express from 'express';
import cors from 'cors';

const app = express();


const corsOptions = {
  origin: 'http://localhost:5173', // Permite solicitudes desde el frontend
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
}

app.use(cors(corsOptions)); // Permite que React consuma la API


// Ruta de prueba
app.get('/', (req, res) => {
  res.json([
    { id: 1, nombre: "Lucas Fernández", puntos: 128 },
    { id: 2, nombre: "Martina López", puntos: 115 }
  ]);
});

app.listen(3000, () => {
  console.log('Servidor API escuchando en http://localhost:3000');
});