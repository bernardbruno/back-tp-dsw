import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Carrera } from './carrera.entity.js'
import { EstadoCarrera } from '../shared/types/enum.js'
import { Predict } from '../predict/predict.entity.js'
import { Piloto } from '../piloto/piloto.entity.js'
import { Resultado } from '../resultado/resultado.entity.js'

const em = orm.em
em.getRepository(Carrera)

const POPULATE_CARRERA = [
  'vuelta_rapida', 'pole', 'circuito', 'resultados',
  'duelo_piloto_a', 'duelo_piloto_b', 'pit_stops_piloto',
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

async function calcularPredicciones(req: Request, res: Response) {
  try {
    if (req.body.sanitizedCarreraInput.estado !== EstadoCarrera.Completada){
    res.status(400).json({ message: 'la carrera debe estar completada para calcular las predicciones'})
    }
    const id = Number.parseInt(req.params.id)
    const carrera = await em.findOneOrFail(Carrera, { id }, {populate: ['resultados', 'duelo_piloto_a', 'duelo_piloto_b']})
    
    console.log(req.body.sanitizedCarreraInput)
    if (Object.keys(req.body.sanitizedCarreraInput).length > 0){
      em.assign(carrera, req.body.sanitizedCarreraInput)
    }

    carrera.estado = EstadoCarrera.Completada

    const carrera_actualizada = await calcularResultadosCarrera(carrera)

    if (!carrera_actualizada){
      return res.status(409).json({message: 'Hubo un error al intentar actualizar los resultados de la carrera'})
    }
    
    //em.assign(carrera, carrera_actualizada)
    em.persist(carrera_actualizada)

    await em.flush()
    
    //calcular predicts
    const predicts = await em.find(
      Predict,
      {carrera: carrera_actualizada },
      {populate: ['puesto1', 'puesto2', 'puesto3', 'pole', 'vuelta_rapida',
        'duelo_ganador', 'piloto_del_dia', 'escuderia_parada_rapida']}
    )

    for (const p of predicts) {
      const valor_puntaje = calcularPredict(p, carrera_actualizada);
      p.puntaje = valor_puntaje
      p.fecha_evaluacion = new Date()

      em.persist(p);
    }

    await em.flush()

    return res.status(200).json({ message: 'Resultados cargados y Predicciones calculadas correctamente para la carrera', data: carrera_actualizada})
      
  } catch (error: any) {
    console.error('Error calcularPredicciones:', error)
    res.status(500).json({ message: error.message })
  }
}

async function calcularResultadosCarrera(carrera: Carrera){
  //let carrera_actualizada = carrera

  if (!carrera.resultados || carrera.resultados.length === 0) {
    return carrera  //no hay res? Devolver error?
  }
  
  const dueloA = carrera.duelo_piloto_a ? (carrera.duelo_piloto_a as any).id ?? carrera.duelo_piloto_a : null
  const dueloB = carrera.duelo_piloto_b ? (carrera.duelo_piloto_b as any).id ?? carrera.duelo_piloto_b : null

  let res_a: Resultado | undefined
  let res_b: Resultado | undefined

  if (dueloA != null) {
    res_a = carrera.resultados.find(r => {
      const pid = (r.piloto as any).id ?? r.piloto
      return pid === dueloA
    })
  }
  if (dueloB != null) {
    res_b = carrera.resultados.find(r => {
      const pid = (r.piloto as any).id ?? r.piloto
      return pid === dueloB
    })
  }
  
  if (!res_a || !res_b) {
    carrera.resultado_duelo_ganador = null
  } else {
    const posA = res_a.posicion ?? Number.POSITIVE_INFINITY
    const posB = res_b.posicion ?? Number.POSITIVE_INFINITY

    if (posA === posB) {
      carrera.resultado_duelo_ganador = null
    } else if (posA < posB) {
      const pilotoA = await em.findOneOrFail(Piloto, { id: (res_a.piloto as any).id ?? res_a.piloto })
      carrera.resultado_duelo_ganador = pilotoA
    } else {
      const pilotoB = await em.findOneOrFail(Piloto, { id: (res_b.piloto as any).id ?? res_b.piloto })
      carrera.resultado_duelo_ganador = pilotoB
    }
  }
  let colapinto: Piloto | null
  try {
    colapinto = await em.findOneOrFail(Piloto, {apellido: 'Colapinto'})
  } catch(err){
    colapinto = null
  }

  if (!colapinto){
    carrera.resultado_posicion_colapinto = null
    return carrera
  }
  

  const res_col = carrera.resultados.find(r => {
    const pid = (r.piloto as any).id ?? r.piloto
    return pid === (colapinto as any).id
  })

  if (!res_col) {
    // Colapinto no participó o no hay resultado registrado
    carrera.resultado_posicion_colapinto = null
  } else {
    carrera.resultado_posicion_colapinto = res_col.posicion ?? null
  }

  return carrera
}

function calcularPredict(p: Predict, carrera_actualizada: Carrera){
  return 1
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

export { sanitizeCarreraInput, findAll, findOne, add, update, calcularPredicciones, remove }