import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Group extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  info: string;

  @Column({ nullable: true })
  level: string;
}
