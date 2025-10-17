import { Request, Response, NextFunction } from 'express'
import { orm } from "../shared/db/orm.js"
import { Carrera } from '../carrera/carrera.entity.js'
import { Predict } from './predict.entity.js'

const em = orm.em
em.getRepository(Predict)
em.getRepository(Carrera)

function sanitizePredictInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedPredictInput = {
        carrera: req.params.carrera,
        usuario: req.body.usuario,
        pole: req.body.pole,
        puesto1: req.body.puesto1,
        puesto2: req.body.puesto2,
        puesto3: req.body.puesto3,
        no_termina: req.body.no_termina,
        vuelta_rapida: req.body.vuelta_rapida,
        posicion_colapinto: req.body.posicion_colapinto,
        fecha: req.body.fecha
    }

    Object.keys(req.body.sanitizedPredictInput).forEach((key) => {
        if (req.body.sanitizedPredictInput[key] === undefined){
            delete req.body.sanitizedPredictInput[key]
        }
    })

    next()
}

async function findAllPorCarrera(req: Request, res: Response, next: NextFunction) {
  try{
        const id = Number.parseInt(req.params.carrera)
        const carrera = await em.findOneOrFail(
            Carrera, 
            { id },
            {populate: ['vuelta_rapida', 'pole', 'circuito']}
        )

        const predicts = await em.find(
            Predict,
            {carrera: id},
            {populate: ['usuario'] }
        )

        res
            .status(200)
            .json({message: 'Buscar todas las predicts de una carrera',
                data: {carrera: carrera, predicts: predicts}
            })    

  } catch (error: any){
    res.status(500).json({message: error.message})
  }
  
}

async function findOne(req: Request, res: Response){
    try{
        const id_carrera = Number.parseInt(req.params.carrera)
        const id_usuario = Number.parseInt(req.params.usuario)

        const predict = await em.findOneOrFail(
            Predict,
            {carrera: id_carrera, usuario: id_usuario},
            {populate: ['carrera', 'usuario']}
        )
        
        res
            .status(200)
            .json({message: 'Buscar una predict',
                data: {predict: predict}
            }) 

    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try {
        const predict = em.create(Predict, req.body.sanitizedPredictInput)
        await em.flush()
        res
            .status(201)
            .json({message: 'Predict creada', data: predict})

    } catch(error: any){
        res.status(500).json({message: error.message})
    }
}



export {
    sanitizePredictInput,
    findAllPorCarrera,
    findOne,
    add
}