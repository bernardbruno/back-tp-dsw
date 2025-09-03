import { Entity, Property, Collection} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Circuito extends BaseEntity {
    @Property({nullable: false})    
    nombre!:string

    @Property({nullable: false})    
    ubicacion!:string

    @Property({nullable: false})    
    pais!:string

    @Property({nullable: false})    
    vueltas!:number
    
    @Property({nullable: false})    
    longitud_km!:number
}