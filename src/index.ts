import { getDirPath } from '@/utils/get-dir-path.js';
import { appLogger } from '@/utils/logger.js';
import Bree from 'bree';
import * as path from 'node:path';
import * as process from 'node:process';

if (process.env.NODE_ENV === 'development') {
	appLogger.warn({
		message: "Can't run scheduler in dev mode. Exiting...",
		service: 'system',
	});
	process.exit(0);
}

const __dirname = getDirPath(import.meta.url);
const bree = new Bree({
	jobs: [
		{
			name: 'daily-movie',
			timeout: '10s',
			interval: 'at 11:45 am',
		},
	],

	logger: appLogger,

	/**
	 * Always set the root option when doing any type of
	 * compiling with bree. This just makes it clearer where
	 * bree should resolve the jobs folder from. By default it
	 * resolves to the jobs folder relative to where the program
	 * is executed.
	 */
	root: path.resolve(__dirname, 'jobs'),
});

appLogger.info({
	message: 'Starting job scheduler',
	service: 'system',
});

await bree.start();
