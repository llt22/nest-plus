import * as winston from 'winston';

const { createLogger, format, transports } = winston;

const { combine, timestamp, prettyPrint, errors } = format;

const createDailyRotateFileTransport = (filename, level = 'info') => {
  const t = winston.transports as any;

  return new t.DailyRotateFile({
    filename,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '1m',
    maxFiles: '7d',
    level,
  });
};

const _createLogger = () => {
  const ts: any = [new transports.Console()];
  if (process.env.NODE_ENV !== 'development') {
    const errorFileTransport = createDailyRotateFileTransport('logs/error-%DATE%.log', 'error');
    ts.push(errorFileTransport);
  }
  return createLogger({
    format: combine(
      errors({ stack: true }), // <-- use errors format
      timestamp(),
      prettyPrint(),
    ),
    transports: ts,
  });
};

export const commonLogger = _createLogger();
