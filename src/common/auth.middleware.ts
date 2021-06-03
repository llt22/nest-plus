import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { config } from '../config';
import { UserService } from '../module/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) throw new UnauthorizedException('请先登录');

    let decoded;
    try {
      decoded = jwt.verify(token.split(' ')[1], config.jwt.secret);
    } catch (err) {
      let errMsg = '';
      if (err.name === 'TokenExpiredError') {
        errMsg = 'token 已过期';
      } else {
        errMsg = 'token 非法';
      }
      throw new UnauthorizedException(errMsg);
    }

    const user = await this.userService.findOne(decoded.uid);
    if (!user) throw new UnauthorizedException('用户不存在');
    req.user = user;
    next();
  }
}
