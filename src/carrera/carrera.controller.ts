import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Carrera } from './carrera.entity.js'

const em = orm.em
em.getRepository(Carrera)

function sanitizeCarreraInput(req: Request, res: Response, next: NextFunction) {

  req.body.sanitizedCarreraInput = {
    nombre: req.body.nombre,
    numero: req.body.numero,
    fecha_carrera: req.body.fecha_carrera,
    hora_carrera: req.body.hora_carrera,
    estado: req.body.estado,
    vuelta_rapida: req.body.vuelta_rapida,
    pole: req.body.pole,
    circuito: req.body.circuito
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
      { populate: ['vuelta_rapida', 'pole', 'circuito', 'resultados'] }
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
      { populate: ['vuelta_rapida', 'pole', 'circuito', 'resultados'] }
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
            {populate: ['vuelta_rapida', 'pole', 'circuito']}
        )
    res.status(200).json({ message: 'carrera actualizada con exito', data: carrera_actualizada })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const carrera = em.getReference(Carrera, id)
    await em.removeAndFlush(carrera)
    res.status(200).json({ message: 'Carrera eliminada con éxito' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeCarreraInput, findAll, findOne, add, update, remove }
