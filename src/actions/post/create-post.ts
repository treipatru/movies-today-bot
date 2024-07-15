import { createStatus } from '@/api/mastodon.js';
import { MediaAttachment } from '@/types/mastodon.js';
import { appLogger } from '@/utils/logger.js';

export async function createPost({
	status,
	statusAttachment,
}: {
	status: string;
	statusAttachment?: MediaAttachment;
}) {
	try {
		const newStatus = await createStatus({
			status,
			mediaIds: statusAttachment ? [statusAttachment.id] : undefined,
			visibility: 'public',
		});

		appLogger.info({
			message: `Posted movie status\n${status}`,
			service: 'mastodon',
		});

		return newStatus;
	} catch (error) {
		appLogger.error({
			error,
			message: 'Failed to post movie status',
			service: 'mastodon',
		});

		throw error;
	}
}
