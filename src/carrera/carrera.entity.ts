import { Entity, Property, ManyToOne, Rel, Cascade, OneToMany, Collection, ManyToMany} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Piloto } from "../piloto/piloto.entity.js"
import { Resultado } from '../resultado/resultado.entity.js';
import { Circuito } from "../circuito/circuito.entity.js";
import { Escuderia } from "../escuderia/escuderia.entity.js";
import { EstadoCarrera } from "../shared/types/enum.js";

@Entity()
export class Carrera extends BaseEntity {

    @Property({nullable: false})    
    nombre!:string

    @Property({nullable: false})    
    fecha_carrera!:Date

    @Property({nullable: false})    
    hora_carrera!:number

    @Property({nullable: false, default: EstadoCarrera.EnPreparacion })
    estado!: EstadoCarrera                         //'en preparacion', 'disponible', 'completada'

    @ManyToOne(()=> Piloto, {nullable: true})
    vuelta_rapida?: Rel<Piloto> | null

    @ManyToOne(()=> Piloto, {nullable: true})
    pole?: Rel<Piloto>| null

    @ManyToOne(()=> Circuito, {nullable: false})
    circuito!: Circuito

    @OneToMany(() => Resultado, r => r.carrera, {nullable: true, cascade: [Cascade.ALL], orphanRemoval: true 
    })
    resultados = new Collection<Resultado>(this);

    // Configuración de desafíos (la define el admin antes de la carrera, es la misma para todos los usuarios) 

    @ManyToOne(() => Piloto, {nullable: true})
    duelo_piloto_a?: Rel<Piloto> | null

    @ManyToOne(() => Piloto, {nullable: true})
    duelo_piloto_b?: Rel<Piloto> | null

    @ManyToOne(() => Piloto, {nullable: true})
    pit_stops_piloto?: Rel<Piloto> | null

    // Resultado oficial de la carrera 
    // (lo carga el admin cuando termina, con esto se van a evaluar las predicciones de los usuarios)

    @Property({nullable: true})
    resultado_safety_car?: boolean | null

    @ManyToOne(() => Piloto, {nullable: true})
    resultado_duelo_ganador?: Rel<Piloto> | null

    @Property({nullable: true})
    resultado_pit_stops_cantidad?: number | null

    @ManyToOne(() => Escuderia, {nullable: true})
    resultado_escuderia_parada_rapida?: Rel<Escuderia> | null

    @ManyToOne(() => Piloto, {nullable: true})
    resultado_piloto_del_dia?: Rel<Piloto> | null

    @Property({nullable: true})
    resultado_posicion_colapinto?: number | null
}