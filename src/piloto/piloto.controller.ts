import { Request ,Response , NextFunction } from 'express'
import { orm } from "../shared/db/orm.js";
import { Piloto } from "./piloto.entity.js"

const em = orm.em
em.getRepository(Piloto)


function sanitizePilotoInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedPilotoInput = {        //aca tendrian q hacerse mas validaciones
        nombre:req.body.nombre,                     //borrar
        apellido: req.body.apellido,
        nacionalidad: req.body.nacionalidad,
        numero: req.body.numero,
        fecha_nacimiento: req.body.fecha_nacimiento,
        estado: req.body.estado,
        debut: req.body.debut,
        titulos: req.body.titulos,
        piloto_img: req.body.piloto_img,
        escuderia: req.body.escuderia
    }

    Object.keys(req.body.sanitizedPilotoInput).forEach((key) => {
        if (req.body.sanitizedPilotoInput[key] === undefined) {
            delete req.body.sanitizedPilotoInput[key]
        }
    })

    next()
}

async function findAll(req: Request, res:Response) {
    try {
        const pilotos = await em.find(
            Piloto,
            {},
            {populate: ['escuderia']}
        )
        res.status(200).json({message: 'Buscar todos los pilotos', data: pilotos})
        
    }catch(error:any) {
        res.status(500).json({message: error.message})
    }

}

async function findAllActivos(req: Request, res:Response) {
    try {
        const pilotos = await em.find(
            Piloto,
            {estado: 'activo'},
            {populate: ['escuderia']}
        )
        res.status(200).json({message: 'Buscar todos los pilotos', data: pilotos})
        
    }catch(error:any) {
        res.status(500).json({message: error.message})
    }

}

async function findOne(req: Request, res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const pilotos = await em.findOneOrFail(
            Piloto,
            {id},
            {populate: ['escuderia']}
        )
        res.status(200).json({message: 'Buscar todos los pilotos', data: pilotos})
        
    }catch(error:any) {
        res.status(500).json({message: error.message})
    } 
}

async function add(req: Request, res: Response) {
    try{
        const piloto= em.create(Piloto, req.body.sanitizedPilotoInput)
        await em.flush()
        res.status(201).json({message: 'piloto creado', data: piloto})
    }catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response){
    try{
        const id = Number.parseInt(req.params.id)
        const piloto = await em.findOneOrFail(Piloto, {id})
        em.assign(piloto, req.body.sanitizedPilotoInput)
        await em.flush()
    } catch(error:any){
    res.status(500).json({message: error.message})  
    }
}

async function remove(req: Request, res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const piloto = em.getReference(Piloto, id)
        await em.removeAndFlush(piloto)
        res.status(200).json({message: "Piloto eliminado con exito"})        
    } catch (error: any) {
        res.status(500).json({message: error.message})
        
    }  
}

export {sanitizePilotoInput, findAll, findAllActivos, findOne, add, update, remove}