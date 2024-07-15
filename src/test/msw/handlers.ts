import {
	generateMediaAttachment,
	generateStatus,
} from '@/test/fakers/mastodon.js';
import { http, HttpResponse } from 'msw';
import { generateMovie } from '../fakers/moviedb.js';

const {
	MASTODON_BASE_URL,
	MOVIEDB_API_URL,
} = process.env;
export const ENDPOINTS = {
	mastodon: {
		homeTimeline: `${MASTODON_BASE_URL}/api/v1/timelines/home`,
		statuses: `${MASTODON_BASE_URL}/api/v1/statuses`,
		media: `${MASTODON_BASE_URL}/api/v1/media`,
	},
	movieDb: {
		discover: `${MOVIEDB_API_URL}/3/discover/movie`,
	},
	image: 'https://image.test/image.jpg',
};

const mastodonHandlers = [
	http.get(ENDPOINTS.mastodon.homeTimeline, () => {
		/**
		 * Generate a list of recent statuses and sort them by creation date
		 */
		const statuses = [
			generateStatus(),
			generateStatus(),
			generateStatus(),
		].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

		return HttpResponse.json(statuses);
	}),

	http.post(ENDPOINTS.mastodon.statuses, () => {
		return HttpResponse.json(generateStatus());
	}),

	http.get(ENDPOINTS.mastodon.media, () => {
		return HttpResponse.json(generateMediaAttachment());
	}),

	http.post(ENDPOINTS.mastodon.media, () => {
		return HttpResponse.json(generateMediaAttachment());
	}),
];

const movieDbHandlers = [
	http.get(ENDPOINTS.movieDb.discover, () => {
		return HttpResponse.json({
			page: 1,
			results: [
				generateMovie(),
				generateMovie(),
				generateMovie(),
			],
			total_pages: 1,
			total_results: 3,
		});
	}),

	http.get(ENDPOINTS.image, async () => {
		return HttpResponse.json();
	}),
];

export const handlers = [
	...mastodonHandlers,
	...movieDbHandlers,
];
