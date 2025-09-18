import { Request ,Response , NextFunction } from 'express'
import { orm } from "../shared/db/orm.js";
import { Escuderia } from "./escuderia.entity.js"

const em = orm.em
em.getRepository(Escuderia)


function sanitizeEscuderiaInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedEscuderiaInput = {        //aca tendrian q hacerse mas validaciones
        nombre: req.body.nombre,
        pais_base: req.body.pais_base,
        jefe_equipo: req.body.jefe_equipo,
        motor: req.body.motor,
        campeonatos_constructores: req.body.campeonatos_constructores,
        debut: req.body.debut,
        logo: req.body.logo,
        auto_img: req.body.auto_img,
    }

    Object.keys(req.body.sanitizedEscuderiaInput).forEach((key) => {
        if (req.body.sanitizedEscuderiaInput[key] === undefined) {
            delete req.body.sanitizedEscuderiaInput[key]
        }
    })

    next()
}

async function findAll(req: Request, res:Response) {
    try{
        const escuderias = await em.find(Escuderia, {})
        res.status(200).json({message: 'Buscar todos las escuderias', data:escuderias})
    }   catch (error: any){
        res.status(500).json({message: error.message})      //usar nuestros propios msgs de error para los clientes
    } 
}
async function findOne(req: Request, res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const escuderia = await em.findOneOrFail(Escuderia, {id})
        res
            .status(200)
            .json({message: 'escuderia encontrada', data: escuderia})

    } catch (error: any) {
        res.status(500).json({message: error.message})

    }
}

async function add(req: Request, res: Response) {
        try{
            const escuderia = em.create(Escuderia, req.body)
            await em.flush()
            res.status(201).json({message: 'escuderia creada', data:escuderia})

        } catch (error:any){
            res.status(500).json({message: error.message})
        }

}

async function update(req: Request, res: Response){
        try{
            const id = Number.parseInt(req.params.id)
            const escuderia = em.getReference(Escuderia, id)
            em.assign(escuderia, req.body)
            await em.flush()
            res.status(200).json({message: 'escuderia actualizada con exito'})
        } catch (error:any){
            res.status(500).json({message: error.message})

        }

}

async function remove(req: Request, res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const escuderia = em.getReference(Escuderia, id)
        await em.removeAndFlush(escuderia)
        res.status(200).json({message: 'escuderia eliminada con exito'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
        
        
    }
}

export {sanitizeEscuderiaInput, findAll, findOne, add, update, remove}