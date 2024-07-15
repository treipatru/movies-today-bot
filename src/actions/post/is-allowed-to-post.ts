import { Status } from '@/types/mastodon.js';
import { differenceInHours } from 'date-fns';
import process from 'node:process';

/**
 * Check if the bot is allowed to post.
 *
 * @export
 * @param {Status[]} posts
 * @return {boolean} True if the conditions are met
 */
export function isAllowedToPost(posts: Status[]): boolean {
	if (process.env.NODE_ENV === 'development') {
		return true;
	}

	if (posts.length === 0) {
		return false;
	}

	const now = new Date();
	const hoursDiff = differenceInHours(now, posts[0].createdAt);

	return hoursDiff < 23;
}
