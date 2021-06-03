import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const isArray = function (a) {
  return Array.isArray(a);
};

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const toUnderscore = (s) => {
  return s
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();
};

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

export const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }

  return o;
};

export const keysToUnderscore = function (o) {
  if (o instanceof Date) {
    return o;
  }
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toUnderscore(k)] = keysToUnderscore(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToUnderscore(i);
    });
  }

  return o;
};

@Injectable()
export class CamelUnderscoreInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.body = keysToCamel(req.body);

    return next.handle().pipe(
      map((data) => {
        return keysToUnderscore(data);
      }),
    );
  }
}
