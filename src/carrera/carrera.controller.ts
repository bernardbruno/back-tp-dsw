import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Carrera } from './carrera.entity.js'

const em = orm.em
em.getRepository(Carrera)

const POPULATE_CARRERA = [
  'vuelta_rapida', 'pole', 'circuito', 'resultados',
  'duelo_piloto_a', 'duelo_piloto_b', 'pit_stops_piloto',
  'resultado_puesto1', 'resultado_puesto2', 'resultado_puesto3',
  'resultado_duelo_ganador',
  'resultado_escuderia_parada_rapida', 'resultado_piloto_del_dia'
] as const

function sanitizeCarreraInput(req: Request, res: Response, next: NextFunction) {

  req.body.sanitizedCarreraInput = {
    nombre: req.body.nombre,
    fecha_carrera: req.body.fecha_carrera,
    hora_carrera: req.body.hora_carrera,
    estado: req.body.estado,
    vuelta_rapida: req.body.vuelta_rapida,
    pole: req.body.pole,
    circuito: req.body.circuito,
    duelo_piloto_a: req.body.duelo_piloto_a,
    duelo_piloto_b: req.body.duelo_piloto_b,
    pit_stops_piloto: req.body.pit_stops_piloto,
    resultado_puesto1: req.body.resultado_puesto1,
    resultado_puesto2: req.body.resultado_puesto2,
    resultado_puesto3: req.body.resultado_puesto3,
    resultado_no_termina: req.body.resultado_no_termina,
    resultado_safety_car: req.body.resultado_safety_car,
    resultado_duelo_ganador: req.body.resultado_duelo_ganador,
    resultado_pit_stops_cantidad: req.body.resultado_pit_stops_cantidad,
    resultado_piloto_penalizado: req.body.resultado_piloto_penalizado,
    resultado_escuderia_parada_rapida: req.body.resultado_escuderia_parada_rapida,
    resultado_piloto_del_dia: req.body.resultado_piloto_del_dia,
    resultado_posicion_colapinto: req.body.resultado_posicion_colapinto
  }

  Object.keys(req.body.sanitizedCarreraInput).forEach((key) => {
    if (req.body.sanitizedCarreraInput[key] === undefined) {
      delete req.body.sanitizedCarreraInput[key]
    }
  })

  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const carreras = await em.find(
      Carrera,
      {},
      { populate: POPULATE_CARRERA }
    )
    res.status(200).json({ message: 'Buscar todas las carreras', data: carreras })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const carrera = await em.findOneOrFail(
      Carrera,
      { id },
      { populate: POPULATE_CARRERA }
    )
    res.status(200).json({ message: 'Buscar una carrera', data: carrera })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const carrera = em.create(Carrera, req.body.sanitizedCarreraInput)
    await em.flush()
    res.status(201).json({ message: 'Carrera creada', data: carrera })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const carrera = await em.findOneOrFail(Carrera, { id })
    em.assign(carrera, req.body.sanitizedCarreraInput)
    await em.flush()

    const carrera_actualizada = await em.findOneOrFail(
            Carrera,
            { id },
            {populate: POPULATE_CARRERA}
        )
    res.status(200).json({ message: 'carrera actualizada con exito', data: carrera_actualizada })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const carrera = await em.findOneOrFail(Carrera, id, { populate: ['resultados'] })
    await em.removeAndFlush(carrera)
    res.status(200).json({ message: 'Carrera eliminada con éxito' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeCarreraInput, findAll, findOne, add, update, remove }