import { Request ,Response , NextFunction } from 'express'
import { CircuitoRepository} from './circuito.repository.js'
import { Circuito } from './circuito.entity.js'

const repository = new CircuitoRepository

function sanitizeCircuitoInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedCircuitoInput = {        //aca tendrian q hacerse mas validaciones
        id:req.body.id,                     //borrar
        nombre: req.body.nombre,
        ubicacion: req.body.ubicacion,
        pais: req.body.pais,
        vueltas: req.body.vueltas,
        longitud_km: req.body.longitud_km
    }

    Object.keys(req.body.sanitizedCircuitoInput).forEach((key) => {
        if (req.body.sanitizedCircuitoInput[key] === undefined) {
            delete req.body.sanitizedCircuitoInput[key]
        }
    })

    next()
}

function findAll(req: Request, res:Response) {
    return res.json({data: repository.findAll()})
}

function findOne(req: Request, res: Response){
    const id = req.params.id
    const circuito = repository.findOne({id})
    
    if (!circuito){
        return res.status(404).send({message: 'No se encontró el circuito'})
    }
    return res.json({data: circuito})
}

function add(req: Request, res: Response) {
    const input = req.body.sanitizedCircuitoInput

    const circuitoInput = new Circuito(
        input.id,
        input.nombre,
        input.ubicacion,
        input.pais, 
        input.vueltas, 
        input.longitud_km
    )

    const circuito = repository.add(circuitoInput)
    return res.status(201).send({message: 'Circuito creado con éxito', data: circuito})
    
}

function update(req: Request, res: Response){
    req.body.sanitizedCircuitoInput.id = req.params.id
    const circuito = repository.update(req.body.sanitizedCircuitoInput)
    
    if(!circuito){
        return res.status(404).send({message: 'Circuito no encontrado'})
    }

    return res.status(200).send({message: 'Circuito actualizado correctamente', data: circuito})
}

function remove(req: Request, res: Response){
    const id=req.params.id
    const circuito = repository.delete({id})

    if (!circuito){
        return res.status(404).send({message: 'No se encontró el Circuito'})
    }
    return res.status(200).send({message: 'Circuito eliminado con éxito', data: circuito})
}


export {sanitizeCircuitoInput, findAll, findOne, add, update, remove}