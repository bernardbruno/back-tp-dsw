import { Entity, Property, Collection} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Escuderia extends BaseEntity {
    @Property({nullable: false})    
    nombre!:string

    @Property({nullable: false})    
    pais_base!:string

    @Property({nullable: true})    
    jefe_equipo!:string

    @Property({nullable: false})    
    motor!:string
}