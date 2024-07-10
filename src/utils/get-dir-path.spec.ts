import { getDirPath } from '@/utils/get-dir-path.js';
import path from 'node:path';

describe('getDirPath', () => {
	it('should return the directory name of a module', () => {
		const moduleUrl = 'file:///path/to/module.js';
		const expectedDirPath = path.dirname('/path/to/module.js');
		const dirPath = getDirPath(moduleUrl);
		expect(dirPath).toBe(expectedDirPath);
	});

	it('should handle URLs with different schemes', () => {
		const moduleUrl = 'file:///another/path/to/module.js';
		const expectedDirPath = path.dirname('/another/path/to/module.js');
		const dirPath = getDirPath(moduleUrl);
		expect(dirPath).toBe(expectedDirPath);
	});

	it('should handle URLs with special characters', () => {
		const moduleUrl = 'file:///path/to/special%20chars/module.js';
		const expectedDirPath = path.dirname('/path/to/special chars/module.js');
		const dirPath = getDirPath(moduleUrl);
		expect(dirPath).toBe(expectedDirPath);
	});
});
