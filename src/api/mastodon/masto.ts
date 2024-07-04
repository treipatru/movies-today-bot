import { createRestAPIClient } from 'masto';

export const mastoApi = createRestAPIClient({
	url: process.env.MASTODON_BASE_URL,
	accessToken: process.env.MASTODON_ACCESS_TOKEN,
});

export { mastodon } from 'masto';
