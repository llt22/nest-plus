import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserService } from '../module/user/user.service';

@Injectable()
export class LoginRequiredGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (!token) throw new UnauthorizedException('请先登录');
    try {
      const decoded: any = jwt.verify(token, config.jwt.secret);

      req.user = await this.userService.findOne(decoded.id);
      return true;
    } catch (err) {
      let errMsg = '';
      if (err.name === 'TokenExpiredError') {
        errMsg = 'token 已过期';
      } else {
        errMsg = 'token 非法';
      }
      throw new ForbiddenException(errMsg);
    }
  }
}
