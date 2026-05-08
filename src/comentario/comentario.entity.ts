import { Entity, Property, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Usuario } from "../usuario/usuario.entity.js";
import { Post } from "../post/post.entity.js";

@Entity()
export class Comentario extends BaseEntity {
    @Property({ nullable: false })
    cuerpo!: string

    @Property({ nullable: false })
    fecha_hora!: Date

    @Property({ nullable: false, default: 0 })
    likes!: number

    @ManyToOne(() => Post, { nullable: false })
    post!: Rel<Post>

    @ManyToOne(() => Usuario, { nullable: false })
    usuario!: Rel<Usuario>
}