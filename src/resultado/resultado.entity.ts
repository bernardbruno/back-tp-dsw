// src/modules/resultado/resultado.entity.ts
import {  Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { Piloto } from '../piloto/piloto.entity.js';
import { Carrera } from '../carrera/carrera.entity.js';

@Entity()
export class Resultado {
  @ManyToOne(() => Piloto, { primary: true })
  piloto!: Rel<Piloto>

  @ManyToOne(() => Carrera, { primary: true })
  carrera!: Carrera;

  @Property()
  posicion!: number;

  @Property()
  estado!: string //DNF DNS 

  //tiempos?
}
