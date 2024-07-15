/// <reference types="vitest" />
import { config } from 'dotenv';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		alias: {
			'@/': new URL('./src/', import.meta.url).pathname,
		},
		env: {
			...config({ path: './.env.test' }).parsed,
		},
		coverage: {
			provider: 'istanbul',
			exclude: [
				'dist/**/*.*',
				'src/**/*.spec.ts',
				'src/test/**/*.*',
				'src/types/*.*',
			],
		},
		globals: true,
	},
});
