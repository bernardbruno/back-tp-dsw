import { Entity, Property, Collection, OneToMany, Cascade} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Piloto } from "../piloto/piloto.entity.js"

@Entity()
export class Escuderia extends BaseEntity {
    @Property({nullable: false})    
    nombre!:string

    @Property({nullable: false})    
    pais_base!:string

    @Property()    
    jefe_equipo!:string

    @Property({nullable: false})    
    motor!:string

    @Property({nullable:false, default: 0})    
    campeonatos_constructores!:number

    @Property()    
    debut!:string

    @Property()    
    logo!:string

    @Property()    
    auto_img!:string

    @OneToMany(() => Piloto, piloto => piloto.escuderia, {cascade: [Cascade.ALL]})
    pilotos= new Collection<Piloto>(this)
}