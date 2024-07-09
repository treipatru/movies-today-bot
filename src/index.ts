import Bree from 'bree';
import path from 'path';
import { getDirPath } from './utils/get-dir-path.js';

const __dirname = getDirPath(import.meta.url);

const bree = new Bree({
	root: path.resolve(__dirname, 'jobs'),
	jobs: [
		{
			name: 'daily-movie',
			timeout: '10s',
			interval: '1d',
		},
	],
});

console.log('Starting Bree...');
await bree.start();
