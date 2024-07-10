import { Status } from '@/types/mastodon.js';
import { differenceInHours } from 'date-fns';

/**
 * Check if the last post was made today.
 *
 * @export
 * @param {Status[]} posts
 * @return {boolean} True if the last post was made today
 */
export function hasPostedToday(posts: Status[]): boolean {
	if (posts.length === 0) {
		return false;
	}

	const now = new Date();
	const hoursDiff = differenceInHours(now, posts[0].createdAt);

	return hoursDiff < 24;
}
