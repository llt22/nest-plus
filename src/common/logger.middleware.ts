import { httpLogger } from './http.logger';

export function loggerMiddleware(req, res, next) {
  const now = Date.now();

  const send = res.send;
  // todo: 从配置读取不写入日志的字段，从 reqBody 删除
  const message = {
    statusCode: res.statusCode,
    method: req.method,
    originalUrl: req.originalUrl,
    cost: 0,
    contentType: req.headers['content-type'],
    reqBody: req.body,
    resBody: undefined,
  };

  res.send = function (string) {
    const body = string instanceof Buffer ? string.toString() : string;
    message.resBody = body;
    message.cost = Date.now() - now;
    send.call(this, body);
  };

  res.on('close', () => {
    // todo: 从配置读取不写入日志的 url 路径，不写入日志
    const { statusCode } = res;
    message.statusCode = statusCode;

    if (statusCode >= 200 && statusCode < 400) {
      httpLogger.info(message);
    }
    if (statusCode < 500 && statusCode >= 400) {
      httpLogger.warn(message);
    }

    if (statusCode >= 500) {
      httpLogger.error(message);
    }
  });

  next();
}
