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

function sanitizeManyResultadosInput(req: Request, res: Response, next: NextFunction) {
    const raw_pilotos = req.body.pilotos

    if (!Array.isArray(raw_pilotos)) {
      return res.status(400).json({message: "pilotos debe ser un array"})
    }

    const sanitized_pilotos = []
    for (let i = 0; i < raw_pilotos.length; i++){
      const piloto = raw_pilotos[i]
      if (typeof piloto !== 'object' || piloto === null) {
        return res.status(400).json({message: `El piloto en la posición ${i} no es un objeto`})
      }
      if (piloto.posicion !== undefined) {
        const pos = Number(piloto.posicion)
        if (Number.isNaN(pos)|| !Number.isInteger(pos) || pos < 0){
          return res.status(400).json({message: `El campo 'posicion' del piloto ${i} es inválido`})
      }}
      if (piloto.estado !== undefined){
        if (typeof piloto.estado !== 'string'){
          return res.status(400).json({message: `El campo 'estado' en posición ${i} es inválido`})
      }}
      
      sanitized_pilotos.push({
      id: piloto.id,
      ...(piloto.posicion !== undefined ? { posicion: piloto.posicion } : {}),
      ...(piloto.estado !== undefined ? { estado: piloto.estado } : {}),
      })
    }

    req.body.sanitized_pilotos = sanitized_pilotos

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
        { id },
        {populate: ['vuelta_rapida', 'pole', 'circuito']}
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

      for (const id_piloto of req.body.sanitized_pilotos){
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
    //res.status(299).json({data: req.body.sanitized_pilotos})
}

async function updateOne(req: Request, res: Response) {
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

async function updateMany(req: Request, res: Response) {
  try {
      const id_carrera = Number.parseInt(req.params.carrera)
      const carrera = await em.findOneOrFail(Carrera, { id: id_carrera })

      for (const res_piloto of req.body.sanitized_pilotos){
        const id_piloto = res_piloto.id
        const referency_piloto = await em.findOneOrFail(Piloto, id_piloto)

        const resultado = await em.findOneOrFail(Resultado, {
          piloto: referency_piloto,
          carrera: carrera,
        })
        const resultado_act = em.assign(resultado, res_piloto)        
      }

      await em.flush()
      
      res.status(200).json({message: 'resultados actualizados con exito', data: {carrera: carrera}})
            
    } catch (error:any) {
      res.status(500).json ({message: error.message})
    }
  //res.status(299).json({message: "updateMany"})
}

async function remove(req: Request, res: Response) {
  try {
    const pilotoId = Number.parseInt(req.params.piloto)
    const carreraId = Number.parseInt(req.params.carrera)
    const resultado = await em.findOneOrFail(
        Resultado,
        { piloto: pilotoId, carrera: carreraId }
    );

    const carrera = await em.findOneOrFail(Carrera, carreraId, {populate: ['pole', 'vuelta_rapida']})
    
    let changed = false

    if (carrera.pole && carrera.pole.id === pilotoId) {
      carrera.pole = null
      changed = true
    }
    if (carrera.vuelta_rapida && carrera.vuelta_rapida.id === pilotoId) {
      carrera.vuelta_rapida = null
      changed = true
    }

    await em.removeAndFlush(resultado);

    res
      .status(200)
      .json({ message: 'Resultado eliminado con éxito'})
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {
  sanitizeResultadoInput,
  sanitizeManyResultadosInput,
  findAll,
  findAllPorCarrera,
  findOne,
  addOne,
  updateOne,
  remove,
  addResultadosEnCarrera,
  updateMany
}
