import { getDiscoveryMovies } from '@/actions/movie/get-discovery-movies.js';
import { ENDPOINTS } from '@/test/msw/handlers.js';
import { server } from '@/test/msw/server.js';
import { http, HttpResponse } from 'msw';

describe('getDiscoveryMovies', () => {
	server.listen();

	it('returns a list of movies with the expected properties', async () => {
		const movies = await getDiscoveryMovies();

		const movie = movies[0];
		expect(movie).toHaveProperty('id');
		expect(movie).toHaveProperty('title');
		expect(movie).toHaveProperty('overview');
		expect(movie).toHaveProperty('release_date');
		expect(movie).toHaveProperty('poster_path');
	});

	it('throws an error if any of the requests fail', async () => {
		server.use(
			http.get(
				ENDPOINTS.movieDb.discover,
				() => {
					return HttpResponse.error();
				},
				{ once: true },
			),
		);

		await expect(getDiscoveryMovies())
			.rejects
			.toThrow();
	});
});
