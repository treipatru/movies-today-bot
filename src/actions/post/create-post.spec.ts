import { createPost } from '@/actions/post/create-post.js';
import { generateMediaAttachment, generateStatus } from '@/test/fakers/mastodon.js';
import { ENDPOINTS } from '@/test/msw/handlers.js';
import { server } from '@/test/msw/server.js';
import { http, HttpResponse } from 'msw';

describe('createPost', () => {
	server.listen();

	test('it should create post without attachment', async () => {
		const newStatus = generateStatus();

		server.use(
			http.post(
				ENDPOINTS.mastodon.statuses,
				() => {
					return HttpResponse.json(newStatus);
				},
				{ once: true },
			),
		);

		const createdStatus = await createPost({ status: 'In the mood for love' });
		expect(createdStatus).toEqual(newStatus);
		expect(createdStatus.mediaAttachments).toHaveLength(0);
	});

	test('it should create post with attachment', async () => {
		const newStatus = generateStatus();
		const media = generateMediaAttachment();

		server.use(
			http.post(
				ENDPOINTS.mastodon.statuses,
				() => {
					return HttpResponse.json({
						...newStatus,
						media_attachments: [media],
					});
				},
				{ once: true },
			),
		);

		const createdStatus = await createPost({
			status: 'In the mood for love',
			statusAttachment: media,
		});

		expect(createdStatus).toEqual({
			...newStatus,
			mediaAttachments: [media],
		});
	});

	test('it should throw an error if the request fails', async () => {
		server.use(
			http.post(
				ENDPOINTS.mastodon.statuses,
				() => {
					return HttpResponse.error();
				},
				{ once: true },
			),
		);

		await expect(createPost({ status: 'In the mood for love' }))
			.rejects
			.toThrow();
	});
});
