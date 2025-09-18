import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Resultado } from './resultado.entity.js'
import { Carrera } from '../carrera/carrera.entity.js'
import { Piloto } from '../piloto/piloto.entity.js'

const em = orm.em
em.getRepository(Resultado)
em.getRepository(Carrera)

function sanitizeResultadoInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedResultadoInput = {
        pilotos: req.body.pilotos, //validar number[]?
        piloto: req.body.piloto,
        carrera: req.body.carrera,
        posicion: req.body.posicion,
        estado: req.body.estado
    }

  Object.keys(req.body.sanitizedResultadoInput).forEach((key) => {
    if (req.body.sanitizedResultadoInput[key] === undefined) {
      delete req.body.sanitizedResultadoInput[key]
    }
  })

  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const resultados = await em.find(
      Resultado,
      {},
      { populate: ['piloto', 'carrera'] }
    )
    res
      .status(200)
      .json({ message: 'Buscar todos los resultados', data: resultados })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findAllPorCarrera(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.carrera)
    const carrera = await em.findOneOrFail(
        Carrera,
        { id }
    )
    const resultados = await em.find(
      Resultado,
      {carrera: id},
      { populate: ['piloto'] }
    )
    res
      .status(200)
      .json({ message: 'Buscar todos los resultados', data: {carrera: carrera, resultados: resultados}})
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    // parseamos las PK compuestas desde params
    const piloto_id = Number.parseInt(req.params.piloto)
    const carrera_id = Number.parseInt(req.params.carrera)
    const resultado = await em.findOneOrFail(
      Resultado,
      { piloto: piloto_id, carrera: carrera_id },
      { populate: ['piloto', 'carrera'] }
    )
    res
      .status(200)
      .json({ message: 'Buscar un resultado', data: resultado })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function addOne(req: Request, res: Response) {
  try {
    const resultado = em.create(Resultado, req.body.sanitizedResultadoInput)
    await em.flush()
    res
      .status(201)
      .json({ message: 'Resultado creado', data: resultado })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function addResultadosEnCarrera(req: Request, res: Response) {
    try {
      const id_carrera = Number.parseInt(req.params.carrera)
      const carrera = await em.findOneOrFail(Carrera, { id: id_carrera })

      for (const id_piloto of req.body.pilotos){
        const piloto = await em.findOneOrFail(Piloto, id_piloto)

        const resultado = await em.create(Resultado, {
          piloto: piloto,
          carrera: carrera
        })
      }

      await em.flush()
      
      res.status(200).json({message: 'Se crearon las relaciones de pilotos con la carrera', data: {carrera: carrera}})
      
    } catch (error:any) {
      res.status(500).json ({message: error.message})
    }
}

async function update(req: Request, res: Response) {
  try {
    const piloto_id = Number.parseInt(req.params.piloto)
    const carrera_id = Number.parseInt(req.params.carrera)
    const resultado = await em.findOneOrFail(
      Resultado,
      { piloto: piloto_id, carrera: carrera_id }
    )
    const resultado_act = em.assign(resultado, req.body.sanitizedResultadoInput)
    await em.flush()
    res.status(200).json({ message: 'resultado actualizado con exito', data:  resultado_act})
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const pilotoId = Number.parseInt(req.params.piloto)
    const carreraId = Number.parseInt(req.params.carrera)
    const resultado = await em.findOneOrFail(
        Resultado,
        { piloto: pilotoId, carrera: carreraId }
    );
    await em.removeAndFlush(resultado);

    res
      .status(200)
      .json({ message: 'Resultado eliminado con éxito' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {
  sanitizeResultadoInput,
  findAll,
  findAllPorCarrera,
  findOne,
  addOne,
  update,
  remove,
  addResultadosEnCarrera
}
