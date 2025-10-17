// src/modules/resultado/resultado.entity.ts
import {  Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { Piloto } from '../piloto/piloto.entity.js';
import { Carrera } from '../carrera/carrera.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';


@Entity()
export class Predict {
    @ManyToOne(() => Carrera, { primary: true, nullable: false })
    carrera!: Carrera

    @ManyToOne(()=> Usuario, { primary: true, nullable: false })
    usuario!: Usuario

    @ManyToOne(() => Piloto, { nullable: true})
    pole?: Piloto

    @ManyToOne(() => Piloto, { nullable: false})
    puesto1!: Piloto//Rel<Piloto>


    @ManyToOne(() => Piloto, { nullable: false})
    puesto2!: Piloto


    @ManyToOne(() => Piloto, { nullable: false})
    puesto3!: Piloto


    @ManyToOne(() => Piloto, { nullable: true})
    no_termina?: Piloto


    @ManyToOne(() => Piloto, { nullable: true})
    vuelta_rapida?: Piloto

    @Property({nullable: false})
    posicion_colapinto!: number;

    @Property({nullable: true})
    fecha!: Date;

    
 //tiempos?
}
