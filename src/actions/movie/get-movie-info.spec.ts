import { getMovieInfo } from '@/actions/movie/get-movie-info.js';
import { generateMovie } from '@/fakers/moviedb.js';

test('should return the movie info', () => {
	const movie = generateMovie({
		releaseDate: new Date('1986-05-16'),
	});

	const movieUrl = `https://www.themoviedb.org/movie/${movie.id}`;
	const result = getMovieInfo(movie);

	expect(result).toContain(movie.overview);
	expect(result).toContain(movie.title);
	expect(result).toContain(movieUrl);
	expect(result).toContain('#movie #film #cinema');
});

test('should trim the overview to 350 characters', () => {
	const movie = generateMovie();
	movie.overview = 'a'.repeat(500);

	const result = getMovieInfo(movie);
	expect(result).toContain('a'.repeat(350));
});
