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

/**
 * Create a new media attachment
 *
 * @see https://docs.joinmastodon.org/methods/media/#create
 */
export const createMedia = mastodonClient
	.v1
	.media
	.create;

/**
 * Create a new status
 * Mastodon API endpoint: POST /api/v1/statuses
 *
 * @see https://docs.joinmastodon.org/methods/statuses/#create
 */
export const createStatus = mastodonClient
	.v1
	.statuses
	.create;

/**
 * Get the home timeline
 *
 * @see https://docs.joinmastodon.org/methods/timelines/
 */
export const getTimeline = mastodonClient
	.v1
	.timelines
	.home
	.list;
