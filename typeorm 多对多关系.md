https://github.com/typeorm/typeorm/issues/794
https://typeorm.biunav.com/zh/many-to-many-relations.html

单向多对多关系
1. @JoinTable() 标记关系中的主方，同时生产的第三张表表名也会从主方开始
2. 判断主方的依据，如果此方不存在，另一方还有必要存在吗？比如问题不存在，问题的分类就没有意义，所以主方是
问题
3. 如果只是通过主方查另一方的需求，单向关系就行

```javascript
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
```


```javascript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```


双向多对多关系
1 如果需要从从方查到主方，比如要查某个分类下的所有问题，此时就需要双向关系了
2 注意对于数据库来说只需要第三张表，其它配置属于 orm 的要求

```javascript
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Category, category => category.questions)
  @JoinTable()
  categories: Category[];
}
```


```javascript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Question, question => question.categories)
  questions: Question[];
}
```
