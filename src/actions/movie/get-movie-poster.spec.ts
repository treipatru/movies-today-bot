import { getMoviePoster } from '@/actions/movie/get-movie-poster.js';
import { ENDPOINTS } from '@/test/msw/handlers.js';
import { server } from '@/test/msw/server.js';
import { http, HttpResponse } from 'msw';

describe('getMoviePoster', () => {
	server.listen();

	it('fetches a movie poster', async () => {
		const url = 'https://image.test/image.jpg';
		const poster = await getMoviePoster(url);

		expect(poster).toBeInstanceOf(Response);
	});

	it('throws an error if the request fails', async () => {
		server.use(
			http.get(
				ENDPOINTS.image,
				() => {
					return HttpResponse.error();
				},
				{ once: true },
			),
		);

		await expect(getMoviePoster('https://image.test/image.jpg'))
			.rejects
			.toThrow();
	});
});
