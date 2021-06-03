import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class UserIdentity extends Base {
  @Column()
  password: string;

  @BeforeInsert()
  encrypt() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  isPasswordRight(password) {
    return bcrypt.compareSync(password, this.password);
  }
}
