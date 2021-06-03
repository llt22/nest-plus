import {
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createTime: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamp',
    comment: '删除时间',
    select: false,
  })
  deleteTime: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '最后更新时间',
    select: false,
  })
  updateTime: Date;
}
