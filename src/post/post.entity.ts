import { Entity, Property, ManyToOne, OneToMany, Collection, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Usuario } from "../usuario/usuario.entity.js";
import { Comentario } from "../comentario/comentario.entity.js";

@Entity()
export class Post extends BaseEntity {
    @Property({ nullable: false })
    titulo!: string

    @Property({ nullable: false })
    descripcion!: string

    @Property({ nullable: false })
    fecha_hora!: Date

    @Property({ nullable: false, default: 0 })
    likes!: number

    @ManyToOne(() => Usuario, { nullable: false })
    usuario!: Rel<Usuario>

    @OneToMany(() => Comentario, (c) => c.post)
    comentarios = new Collection<Comentario>(this)
}