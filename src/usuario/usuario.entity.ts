import { Entity, Property, ManyToOne} from '@mikro-orm/core';
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Piloto } from "../piloto/piloto.entity.js";
import { RolUsuario } from "../shared/types/enum.js"
import crypto from 'crypto';


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

  @Property({ hidden: false, nullable: false }) //utilizar hidden!
  password!: string;

  @Property({ nullable: true })
  pais!: string;

  @Property({ type: 'blob', nullable: true })
  user_img?: Buffer;

  @Property({ default: RolUsuario.User ,nullable: false })
  rol!: RolUsuario;

  @Property({ default: 0 })
  puntos!: number;

  @ManyToOne(()=> Piloto, { nullable: true })
  piloto_fav!: Piloto

  static hashPassword(password: string) {
    if (password) {
      return crypto.createHmac('sha256', password).digest('hex');
    }
    return undefined
  }

}
