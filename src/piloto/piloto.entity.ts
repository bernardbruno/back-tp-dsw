import { Entity, Property, ManyToOne, Rel, Collection, ManyToMany, OneToMany} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Escuderia } from "../escuderia/escuderia.entity.js"
import { Carrera } from "../carrera/carrera.entity.js";
import { Resultado } from "../resultado/resultado.entity.js";

@Entity()
export class Piloto extends BaseEntity {
    @Property({nullable: false})    
    nombre!:string

    @Property({nullable: false})    
    apellido!:string

    @Property({nullable: false})    
    nacionalidad!:string

    @Property()    
    numero!:number

    @Property({nullable: false})    
    fecha_nacimiento!:Date

    @Property({nullable: false})    
    estado!:string

    @Property()    
    debut!:string

    @Property({nullable:false, default: 0})    
    titulos!:number

    @Property({nullable: true})    
    piloto_img!:string

    @ManyToOne(() => Escuderia)    
    escuderia!: Rel<Escuderia>
    /*
    @ManyToMany(()=> Carrera, (carrera)=>carrera.pilotos)
    carreras = new Collection<Carrera>(this)
    */
    @OneToMany(() => Resultado, r => r.piloto)
    resultados = new Collection<Resultado>(this);
}

