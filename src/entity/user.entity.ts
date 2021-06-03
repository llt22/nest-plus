import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { config } from '../config';
import * as jwt from 'jsonwebtoken';
import { UserIdentity } from './user.identity.entity';
import { Group } from './group.entity';

@Entity({ name: 'user' })
export class User extends Base {
  @Column()
  username: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  email: string;

  @ManyToMany(() => Group, {
    createForeignKeyConstraints: false,
  })
  @JoinTable({ name: 'user_group' })
  groups: Group[];

  @OneToOne(() => UserIdentity, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  @JoinColumn()
  userIdentity: UserIdentity;

  genToken() {
    const { secret, expiresIn } = config.jwt;
    return jwt.sign(
      {
        uid: this.id,
      },
      secret,
      {
        expiresIn,
      },
    );
  }
}
