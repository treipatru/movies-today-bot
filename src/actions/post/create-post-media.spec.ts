import { createPostMedia } from '@/actions/post/create-post-media.js';
import { generateMediaAttachment } from '@/test/fakers/mastodon.js';
import { ENDPOINTS } from '@/test/msw/handlers.js';
import { server } from '@/test/msw/server.js';
import { http, HttpResponse } from 'msw';

describe('createPostMedia', () => {
	server.listen();

	test('it should create post media', async () => {
		const file = new File([''], 'image.png', { type: 'image/png' });
		const media = generateMediaAttachment();

		server.use(
			http.post(
				ENDPOINTS.mastodon.media,
				() => {
					return HttpResponse.json(media);
				},
				{ once: true },
			),
		);

		const response = await createPostMedia({ file, description: media.description });

		expect(response).toEqual(media);
	});

	test('it should throw an error if the request fails', async () => {
		const file = new File([''], 'image.png', { type: 'image/png' });

		server.use(
			http.post(
				ENDPOINTS.mastodon.media,
				() => {
					return HttpResponse.error();
				},
				{ once: true },
			),
		);

		await expect(createPostMedia({ file }))
			.rejects
			.toThrow();
	});
});
