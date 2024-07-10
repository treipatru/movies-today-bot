import path from 'node:path';
import { fileURLToPath } from 'url';

/**
 * Get the directory name of a module.
 * This is a workaround of `__dirname` not being available in ES modules.
 *
 * @param moduleUrl The URL of the module.
 */
export function getDirPath(moduleUrl: string) {
	const filename = fileURLToPath(moduleUrl);
	return path.dirname(filename);
}
