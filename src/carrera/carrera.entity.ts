import { Entity, Property, ManyToOne, ManyToMany, Rel, Cascade} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Escuderia } from "../escuderia/escuderia.entity.js"
import { Piloto } from "../piloto/piloto.entity.js"

@Entity()
export class Carrera extends BaseEntity {
    @Property({nullable: false})    
    nombre!:string

    @Property()    
    numero!:number

    @Property({nullable: false})    
    fecha_carrera!:Date

    @Property({nullable: false})    
    hora_carrera!:number

    @ManyToOne(()=> Piloto)
    vuelta_rapida!: Rel<Piloto>

    @ManyToOne(()=> Piloto)
    pole!: Rel<Piloto>

    @ManyToMany(()=> Piloto, (piloto)=> piloto.carreras, 
                {cascade: [Cascade.ALL], owner: true})
    pilotos!: Piloto[]
}

