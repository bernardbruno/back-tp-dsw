import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { Circuito } from "./circuito.entity.js"
import { BaseEntity } from '../shared/db/baseEntity.entity.js'

@Entity()
export class CircuitoClass extends BaseEntity {

    @Property({nullable: false, unique:true})
    nombre!: string

    @Property({})
    ubicacion!: string

    @Property()
    pais!: string

    @Property()
    vueltas!: number
    
    @Property()
    longitud_km!: number
    
}