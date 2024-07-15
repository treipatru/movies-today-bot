import { createMedia } from '@/api/mastodon.js';
import { CreateMediaAttachmentParams } from '@/types/mastodon.js';
import { appLogger } from '@/utils/logger.js';

export async function createPostMedia({
	file,
	description,
}: CreateMediaAttachmentParams) {
	try {
		const media = await createMedia({ file, description });
		return media;
	} catch (error) {
		appLogger.error({
			error,
			message: 'Failed to create post media on Mastodon.',
			service: 'mastodon',
		});

		throw error;
	}
}
