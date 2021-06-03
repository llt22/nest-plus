import * as winston from 'winston';
import * as clc from 'cli-color';

require('winston-daily-rotate-file');

const colors = {
  info: 'green',
  warn: 'yellow',
  error: 'red',
};

const getColorStr = (level, str, type) => {
  if (type === 'console') {
    return clc[colors[level]](str);
  }
  return str;
};

const createFormat = (type) => {
  return winston.format.printf((info) => {
    const message = info.message as any;

    const rawLevel = info.level;

    const level = getColorStr(rawLevel, `${info.level}:`, type);
    const method = getColorStr(rawLevel, message.method, type);
    const statusCode = getColorStr(rawLevel, message.statusCode, type);
    const url = getColorStr(rawLevel, message.originalUrl, type);

    const cost = `cost: ${message.cost}ms`;
    const contentType = message.contentType;
    const errStack = message.errStack;

    const reqBody = message.reqBody;
    const resBody = message.resBody;

    let resBodyObj;
    try {
      resBodyObj = JSON.parse(resBody);
    } catch (err) {
      resBodyObj = resBody;
    }

    const data = {
      request: {
        reqBody: reqBody,
        contentType,
      },
      response: {
        resBody: resBodyObj,
      },
    };
    const strRequest = JSON.stringify(data.request, null, 2);
    let strResponse;
    if (!errStack) {
      strResponse = JSON.stringify(data.response, null, 2);
    } else {
      strResponse = resBodyObj;
    }

    return `${level} ${info.timestamp} ${statusCode} ${method} ${url} ${cost}\n${strRequest}\n${strResponse}\n`;
  });
};

const createDailyRotateFileTransport = (filename, level = 'info') => {
  const t = winston.transports as any;

  return new t.DailyRotateFile({
    filename,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '1m',
    maxFiles: '7d',
    level,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY/MM/DD HH:mm:ss',
      }),
      createFormat('file'),
    ),
  });
};

const consoleTransport = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }), // <-- use errors format
    winston.format.timestamp({
      format: 'YYYY/MM/DD HH:mm:ss',
    }),
    createFormat('console'),
  ),
});

const createLogger = () => {
  const transports: any = [consoleTransport];
  if (process.env.NODE_ENV !== 'development') {
    const infoFileTransport = createDailyRotateFileTransport('logs/info-%DATE%.log');
    const warnFileTransport = createDailyRotateFileTransport('logs/warn-%DATE%.log', 'warn');
    const errorFileTransport = createDailyRotateFileTransport('logs/error-%DATE%.log', 'error');

    transports.push(infoFileTransport);
    transports.push(warnFileTransport);
    transports.push(errorFileTransport);
  }
  return winston.createLogger({
    level: 'info',
    transports,
  });
};

export const httpLogger = createLogger();
