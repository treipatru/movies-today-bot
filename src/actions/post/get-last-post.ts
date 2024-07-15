import { getTimeline } from '@/api/mastodon.js';
import { appLogger } from '@/utils/logger.js';

export async function getLastPost() {
	try {
		const posts = await getTimeline({ limit: 1 });
		return posts[0];
	} catch (error) {
		appLogger.error({
			error,
			message: 'Failed to get last post from Mastodon.',
			service: 'mastodon',
		});

		throw error;
	}
}
