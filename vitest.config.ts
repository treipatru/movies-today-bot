/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		alias: {
			'@/': new URL('./src/', import.meta.url).pathname,
		},
		coverage: {
			provider: 'istanbul',
			exclude: [
				'src/fakers/*.*',
				'dist/**/*.*',
			],
		},
		globals: true,
	},
});
