一对多关系中，我们只可能把关系字段放在多方

多方
指定关联字段为 banner_id,并且将自己放到 对方的 items 字段里面
```bash
@ManyToOne(() => Banner, (banner) => banner.items, {
    createForeignKeyConstraints: false,
  })
@JoinColumn()
banner: Banner
```


一方
指定多方是谁，查询的时将多方数据存在 items 字段里
```bash
@OneToMany(() => BannerItem, (bannerItem) => bannerItem.banner)
items: BannerItem[]
```


只有 banner_id 是数据库中真正要求的内容，其它都是 orm 的要求
