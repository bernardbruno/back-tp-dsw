import { Entity, Property, ManyToOne, Rel, Cascade, OneToMany, Collection} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Piloto } from "../piloto/piloto.entity.js"
import { Resultado } from '../resultado/resultado.entity.js';
import { Circuito } from "../circuito/circuito.entity.js";

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

    @ManyToOne(()=> Piloto, {nullable: true})
    vuelta_rapida!: Rel<Piloto>

    @ManyToOne(()=> Piloto, {nullable: true})
    pole!: Rel<Piloto>

    /*
    @ManyToMany(()=> Piloto, (piloto)=> piloto.carreras, 
                {cascade: [Cascade.ALL], owner: true})
    pilotos!: Piloto[]
    */

    @ManyToOne(()=> Circuito, {nullable: false})
    circuito!: Circuito

    @OneToMany(() => Resultado, r => r.carrera, {nullable: true})
    resultados = new Collection<Resultado>(this);
}

