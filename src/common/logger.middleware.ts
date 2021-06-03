import { httpLogger } from './http.logger';

export function loggerMiddleware(req, res, next) {
  const now = Date.now();
  next();

  const send = res.send;

  const message = {
    statusCode: res.statusCode,
    method: req.method,
    originalUrl: req.originalUrl,
    cost: Date.now() - now,
    contentType: req.headers['content-type'],
    reqBody: req.body,
    resBody: undefined,
  };

  res.on('close', () => {
    const { statusCode } = res;
    message.statusCode = statusCode;

    if (statusCode >= 200 && statusCode < 400) {
      httpLogger.info(message);
    }
    if (statusCode < 500 && statusCode >= 400) {
      httpLogger.warn(message);
    }

    if (statusCode >= 500) {
      // 未知错误由从 全局异常处理输出 log
    }
  });

  res.send = function (string) {
    const body = string instanceof Buffer ? string.toString() : string;
    message.resBody = body;
    send.call(this, body);
  };
}
