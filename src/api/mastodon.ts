import { createRestAPIClient } from 'masto';
export { mastodon } from 'masto';

/**
 * Masto.js client instance for the Mastodon API
 *
 * @see https://neet.github.io/masto.js/
 */
const mastodonClient = createRestAPIClient({
	url: process.env.MASTODON_BASE_URL,
	accessToken: process.env.MASTODON_ACCESS_TOKEN,
});

// ==============================
// Mastodon API endpoints

export const createMedia = mastodonClient
	.v2
	.media
	.create;

export const createStatus = mastodonClient
	.v1
	.statuses
	.create;

export const getTimeline = mastodonClient
	.v1
	.timelines;
