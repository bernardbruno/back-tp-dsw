// src/modules/resultado/resultado.entity.ts
import {  Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { Piloto } from '../piloto/piloto.entity.js';
import { Carrera } from '../carrera/carrera.entity.js';

@Entity()
export class Resultado {
  @ManyToOne(() => Piloto, { primary: true , nullable: false})
  piloto!: Rel<Piloto>

  @ManyToOne(() => Carrera, { primary: true, nullable: false })
  carrera!: Carrera;

  @Property({nullable: true})
  posicion!: number;

  @Property({nullable: true})
  estado!: string //DNF DNS 

  //tiempos?
}
