import { isAllowedToPost } from '@/actions/post/is-allowed-to-post.js';
import { generateStatus } from '@/test/fakers/mastodon.js';
import { sub } from 'date-fns';

test('should return true if last post is from less than 24h ago', () => {
	const stream = [
		generateStatus({
			createdAt: sub(new Date(), { hours: 1 }),
		}),
		generateStatus({
			createdAt: sub(new Date(), { hours: 10 }),
		}),
		generateStatus({
			createdAt: sub(new Date(), { days: 2 }),
		}),
	];

	expect(isAllowedToPost(stream)).toBe(true);
});

test('should return false if last post is older than 24h ', () => {
	const stream = [
		generateStatus({
			createdAt: sub(new Date(), { days: 1 }),
		}),
		generateStatus({
			createdAt: sub(new Date(), { days: 2 }),
		}),
		generateStatus({
			createdAt: sub(new Date(), { days: 3 }),
		}),
	];

	expect(isAllowedToPost(stream)).toBe(false);
});

test('should return false if there are no posts', () => {
	expect(isAllowedToPost([])).toBe(false);
});

test('should return true if in development mode', () => {
	process.env.NODE_ENV = 'development';

	expect(isAllowedToPost([])).toBe(true);
});
