非存储库模式不需要像下面在 模块里面导入要使用的实体
```bash
imports: [TypeOrmModule.forFeature([User])]
```

一对一关系中，我们可以把关系的字段放在任何一方的表中
我们根据实际业务确定
思考的思路，如果一方不存在，另一方是否还能存在
示例 User, UserIdentify
如果 User 表不存在，UserIdentify 也没有存在的必要，
所有在 user 表中加入 user_identity_id

```bash
@OneToOne(() => UserIdentity, {
    createForeignKeyConstraints: false,
  })
@JoinColumn()
userIdentity: UserIdentity;
```

此时无论我们无论是直接 sql 还是 orm 都能方便的通过 user 查到 userIdentity

但是在某些一对一的关系中，可能需要从反向查询（双向关系）
示例

通过配置告诉关联的一方是谁，并且告诉 orm 关联查询的时候将数据存在哪个字段李
```javascript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Profile, profile => profile.user) // 指定另一面作为第二个参数
  @JoinColumn()
  profile: Profile;
}
```


```javascript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @OneToOne(() => User, user => user.profile) // 将另一面指定为第二个参数
  user: User;
}
```
