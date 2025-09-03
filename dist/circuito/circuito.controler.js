import { orm } from "../shared/db/orm.js";
import { Circuito } from './circuito.entity.js';
const em = orm.em;
em.getRepository(Circuito);
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
async function findAll(req, res) {
    try {
        const circuitos = await em.find(Circuito, {});
        res.status(200).json({ message: 'Buscar todos los circuitos', data: circuitos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const circuito = await em.findOneOrFail(Circuito, { id });
        res
            .status(200)
            .json({ message: 'circuito encontrado', data: circuito });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const circuito = em.create(Circuito, req.body);
        await em.flush();
        res.status(201).json({ message: 'circuito creado', data: circuito });
    }
    catch (error) {
        res.status(201).json({ message: 'circuito creado', data: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const circuito = em.getReference(Circuito, id);
        em.assign(circuito, req.body);
        await em.flush();
        res.status(200).json({ message: 'circuito actualizado con exito' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const circuito = em.getReference(Circuito, id);
        await em.removeAndFlush(circuito);
        res.status(200).json({ message: 'circuito eliminado con exito' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//export {sanitizeCircuitoInput, findAll, findOne, add, update, remove}
export { sanitizeCircuitoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=circuito.controler.js.map