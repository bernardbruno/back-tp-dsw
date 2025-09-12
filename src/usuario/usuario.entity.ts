import { Entity, Property} from '@mikro-orm/core';
import { BaseEntity } from "../shared/db/baseEntity.entity.js";


@Entity()
export class Usuario extends BaseEntity {

  @Property({ unique: true, nullable: false })
  nombre_usuario!: string;

  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  apellido!: string;

  @Property({ unique: true, nullable: false })
  email!: string;

  @Property({ nullable: false })
  password!: string;

  @Property({ nullable: false })
  pais!: string;

  @Property({ type: 'blob', nullable: true })
  user_img?: Buffer;

  @Property({ nullable: false })
  rol!: string;
}
