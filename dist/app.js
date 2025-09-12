import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { usuarioRouter } from './usuario/usuario.routes.js';
import { circuitoRouter } from './circuito/circuito.routes.js';
import { escuderiaRouter } from './escuderia/escuderia.routes.js';
import { pilotoRouter } from './piloto/piloto.routes.js';
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
};
app.use(cors(corsOptions)); // Permite que React consuma la API
app.use(express.json());
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});
await syncSchema(); //never in production
//middelwares rutas y negocio
app.use('/api/usuario', usuarioRouter);
app.use('/api/circuito', circuitoRouter);
app.use('/api/escuderia', escuderiaRouter);
app.use('/api/piloto', pilotoRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Recurso no encontrado' });
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
//# sourceMappingURL=app.js.map