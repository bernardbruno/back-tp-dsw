import { Request, Response, NextFunction } from 'express'
import { orm } from "../shared/db/orm.js"
import { Carrera } from '../carrera/carrera.entity.js'
import { Predict } from './predict.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'

const em = orm.em
em.getRepository(Predict)
em.getRepository(Carrera)

function sanitizePredictInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedPredictInput = {
        carrera: req.params.carrera,
        //usuario: req.body.usuario, lo tomamos del token
        pole: req.body.pole,
        puesto1: req.body.puesto1,
        puesto2: req.body.puesto2,
        puesto3: req.body.puesto3,
        no_termina: req.body.no_termina,
        vuelta_rapida: req.body.vuelta_rapida,
        posicion_colapinto: req.body.posicion_colapinto,
        fecha: req.body.fecha,
        safety_car: req.body.safety_car,
        duelo_piloto_a: req.body.duelo_piloto_a,
        duelo_piloto_b: req.body.duelo_piloto_b,
        duelo_ganador: req.body.duelo_ganador,
        pit_stops_piloto: req.body.pit_stops_piloto,
        pit_stops_cantidad: req.body.pit_stops_cantidad,
        piloto_penalizado: req.body.piloto_penalizado,
        escuderia_parada_rapida: req.body.escuderia_parada_rapida,
        piloto_del_dia: req.body.piloto_del_dia
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
        const usuario = await em.findOneOrFail(Usuario, {id: req.user.id})

        const yaExiste = await em.findOne(Predict, {
            carrera: req.body.sanitizedPredictInput.carrera,
            usuario: usuario
        })
        if (yaExiste) {
            return res.status(409).json({message: 'Ya existe una predicción para esta carrera'})
        }

        const predictData = req.body.sanitizedPredictInput

        const predict = em.create(Predict, {...predictData, usuario})
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