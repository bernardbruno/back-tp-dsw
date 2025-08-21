import express from 'express';
import cors from 'cors';
import { Circuito } from './circuito.js';
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
};
app.use(express.json());
app.use(cors(corsOptions)); // Permite que React consuma la API
/*
app.use('/', (req,res)=> {
    res.json({message: 'Hello!'})
})
    */
const circuitos = [
    new Circuito("1", "Circuit de Spa-Francorchamps", "Stavelot", "Bélgica", 44, 7.004),
    new Circuito("2", "Circuit de Spa-Francorchamps2", "Stavelot", "Bélgica", 44, 7.004),
    new Circuito("3", "Circuit de Spa-Francorchamps3", "Stavelot", "Bélgica", 44, 7.004),
    new Circuito("4", "Circuit de Spa-Francorchamps4", "Stavelot", "Bélgica", 44, 7.004)
];
function sanitizeCircuitoInput(req, res, next) {
    req.body.sanitizedCircuitoInput = {
        id: req.body.id,
        nombre: req.body.nombre,
        ubicacion: req.body.ubicacion,
        pais: req.body.pais,
        vueltas: req.body.vueltas,
        longitud_km: req.body.longitud_km
    };
    Object.keys(req.body.sanitizedCircuitoInput).forEach((key) => {
        if (req.body.sanitizedCircuitoInput[key] === undefined) {
            delete req.body.sanitizedCircuitoInput[key];
        }
    });
    next();
}
app.get('/api/circuitos', (req, res) => {
    res.json({ data: circuitos });
});
app.get('/api/circuitos/:id', (req, res) => {
    const circuito = circuitos.find((circuito) => circuito.id === req.params.id);
    if (!circuito) {
        return res.status(404).send({ message: 'No se encontró el circuito' });
    }
    res.json({ data: circuito });
});
app.post('/api/circuitos', sanitizeCircuitoInput, (req, res) => {
    const input = req.body.sanitizedCircuitoInput;
    const circuito = new Circuito(input.id, input.nombre, input.ubicacion, input.pais, input.vueltas, input.longitud_km);
    circuitos.push(circuito);
    res.status(201).send({ message: "Circuito creado con exito", data: circuito });
});
app.put('/api/circuitos/:id', sanitizeCircuitoInput, (req, res) => {
    const circuitoIdx = circuitos.findIndex((circuito) => circuito.id === req.params.id);
    if (circuitoIdx === -1) {
        return res.status(404).send({ message: 'Circuito no encontrado' });
    }
    //circuitos[circuitoIdx] = {...circuitos[circuitoIdx], ...req.body.sanitizedCircuitoInput}
    Object.assign(circuitos[circuitoIdx], req.body.sanitizedCircuitoInput);
    res.status(200).send({ message: 'Circuito actualizado correctamente', data: circuitos[circuitoIdx] });
});
app.patch('/api/circuitos/:id', sanitizeCircuitoInput, (req, res) => {
    const circuitoIdx = circuitos.findIndex((circuito) => circuito.id === req.params.id);
    if (circuitoIdx === -1) {
        return res.status(404).send({ message: 'Circuito no encontrado' });
    }
    circuitos[circuitoIdx] = { ...circuitos[circuitoIdx], ...req.body.sanitizedCircuitoInput };
    res.status(200).send({ message: 'Circuito actualizado correctamente', data: circuitos[circuitoIdx] });
});
app.delete('/api/circuitos/:id', (req, res) => {
    const circuitoIndex = circuitos.findIndex((circuito) => circuito.id === req.params.id);
    const output = circuitos[circuitoIndex];
    /*
    if (circuitoIndex === -1){
        res.status(404).send({message: 'No se encontró el Circuito'})
    } else {
        circuitos.splice(circuitoIndex, 1)
        res.status(200).send({message: 'Circuito eliminado con éxito', data: output})
    } */
    if (circuitoIndex === -1) {
        return res.status(404).send({ message: 'No se encontró el Circuito' });
    }
    circuitos.splice(circuitoIndex, 1);
    return res.status(200).send({ message: 'Circuito eliminado con éxito', data: output });
});
app.use((_, res) => {
    return res.status(404).send({
        message: 'Recurso no encontrado'
    });
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
//# sourceMappingURL=app.js.map