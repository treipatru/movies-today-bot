import {
	createLogger,
	format,
	transports,
} from 'winston';
import 'winston-daily-rotate-file';

/**
 * Error levels:
 *
 * error: 0
 * warn: 1
 * info: 2
 * http: 3
 * verbose: 4
 * debug: 5
 * silly: 6
 */

const errorFileTransport = new transports.DailyRotateFile({
	level: 'error',
	filename: 'logs/%DATE%.error.log',
	datePattern: 'YYYY-MM-DD-HH',
	maxSize: '50m',
	maxFiles: '30d',
});

const logFileTransport = new transports.DailyRotateFile({
	level: 'info',
	filename: 'logs/%DATE%.info.log',
	datePattern: 'YYYY-MM-DD-HH',
	maxSize: '50m',
	maxFiles: '30d',
});

const consoleTransport = new transports.Console();

export const appLogger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp(),
		format.json(),
		format.prettyPrint(),
	),
	transports: [
		errorFileTransport,
		logFileTransport,
		...process.env.NODE_ENV === 'test' ? [] : [consoleTransport],
	],
});
