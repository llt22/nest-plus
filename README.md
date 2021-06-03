# nest-base 是一个基于 nestjs 的项目工程库

## 项目说明
虽然 nestjs 在一定程度上规范了 node web 的开发，但是由于语言特性，在项目结构及开发规范上，仍然有很大的灵活度，此项目根据自己的开发习惯和理解确定了一套规范，主要做了以下几件事情
1. 确定项目结构
2. 进行全局异常处理
3. 确定响应格式
4. 日志处理


### 项目主要目录
- `src/config` 配置文件目录
- `src/common` 守卫，中间件，工具函数等等公共模块
- `src/entity` entity
- `src/module` 模块
- `.env` 管理环境


## 启动项目
1. 安装依赖
```bash
# 安装依赖
npm install

# 或者通过淘宝镜像安装依赖
npm install --registry=https://registry.npm.taobao.org
```

2. 配置 mysql 数据库
- 配置文件在 'config' 目录下，根据自己的情况配置环境变量

3. 运行
```bash
npm run start:dev
```


## 环境管理
通过 `.env` 文件中的 `NODE_ENV = xxx` 来区分开发环境,注意和 `config` 中对应


## 依赖
依赖请查看 package.json 文件
