import {  Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { Piloto } from '../piloto/piloto.entity.js';
import { Carrera } from '../carrera/carrera.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';
import { Escuderia } from '../escuderia/escuderia.entity.js';


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

    // ¿Habrá safety car (No VSC) durante la carrera?
    @Property({nullable: true})
    safety_car?: boolean

    // Cara a cara: dos pilotos elegidos, y cuál de los dos termina primero
    @ManyToOne(() => Piloto, { nullable: true})
    duelo_piloto_a?: Piloto

    @ManyToOne(() => Piloto, { nullable: true})
    duelo_piloto_b?: Piloto

    @ManyToOne(() => Piloto, { nullable: true})
    duelo_ganador?: Piloto

    // Cantidad de paradas en boxes de un piloto elegido
    @ManyToOne(() => Piloto, { nullable: true})
    pit_stops_piloto?: Piloto

    @Property({nullable: true})
    pit_stops_cantidad?: number

    // Piloto que va a recibir una penalización (si no elige a nadie, queda null)
    @ManyToOne(() => Piloto, { nullable: true})
    piloto_penalizado?: Piloto

    // Escudería con la parada en boxes más rápida de la carrera
    @ManyToOne(() => Escuderia, { nullable: true})
    escuderia_parada_rapida?: Escuderia

    // Piloto del día (elegido por los fans)
    @ManyToOne(() => Piloto, { nullable: true})
    piloto_del_dia?: Piloto

 //tiempos?
}