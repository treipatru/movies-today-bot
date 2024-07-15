import { appLogger } from '@/utils/logger.js';

export async function getMoviePoster(url: string) {
	try {
		const posterFile = await fetch(url);

		appLogger.info({
			message: `Fetched movie poster ${url}.`,
			service: 'tmdb',
		});

		return posterFile;
	} catch (error) {
		appLogger.error({
			error,
			message: `Failed to fetch movie poster ${url} .`,
			service: 'tmdb',
		});

		throw error;
	}
}
