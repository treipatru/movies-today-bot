import { getLastPost } from '@/actions/post/get-last-post.js';
import { generateStatus } from '@/test/fakers/mastodon.js';
import { ENDPOINTS } from '@/test/msw/handlers.js';
import { server } from '@/test/msw/server.js';
import { http, HttpResponse } from 'msw';

describe('getLastPost', () => {
	server.listen();

	test('it should return the last post', async () => {
		const statuses = [
			generateStatus(),
			generateStatus(),
			generateStatus(),
		].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

		server.use(
			http.get(
				ENDPOINTS.mastodon.homeTimeline,
				() => {
					return HttpResponse.json(statuses);
				},
				{ once: true },
			),
		);

		const response = await getLastPost();
		expect(response).toEqual(statuses[0]);
	});

	test('it should throw an error if the request fails', async () => {
		server.use(
			http.post(
				ENDPOINTS.mastodon.homeTimeline,
				() => {
					return HttpResponse.error();
				},
				{ once: true },
			),
		);

		await expect(getLastPost()).rejects.toThrow();
	});
});
