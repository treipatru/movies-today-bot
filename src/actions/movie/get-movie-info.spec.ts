import {
	getMovieInfo,
	getMovieOverview,
} from '@/actions/movie/get-movie-info.js';
import { generateMovie } from '@/fakers/moviedb.js';

describe('getMovieOverview', () => {
	test('should return the overview if it is less than 350 characters', () => {
		const overview = 'a'.repeat(349);
		const result = getMovieOverview(overview);

		expect(result).toBe(overview);
	});

	test('should return the overview truncated to 350 characters', () => {
		const overview = 'a'.repeat(351);
		const result = getMovieOverview(overview);

		expect(result).toBe('a'.repeat(347) + '...');
	});
});

describe('getMovieInfo', () => {
	test('contains the movie title and release date', () => {
		const movie = generateMovie({
			releaseDate: new Date('1986-05-16'),
		});
		const result = getMovieInfo(movie);

		expect(result).toContain(movie.title);
		expect(result).toContain('May 16th, 1986');
	});

	test('contains the entry URL', () => {
		const movie = generateMovie();
		const result = getMovieInfo(movie);

		expect(result).toContain(`https://www.themoviedb.org/movie/${movie.id}`);
	});

	test('contains post tags', () => {
		const movie = generateMovie();
		const result = getMovieInfo(movie);

		expect(result).toContain('#movie #film #cinema');
	});

	test('contains the full overview if it is less than 350 characters', () => {
		const movie = generateMovie();
		movie.overview = 'a'.repeat(300);
		const result = getMovieInfo(movie);

		expect(result).toContain(movie.overview);
	});

	test('contains the truncated overview if it is more than 350 characters', () => {
		const movie = generateMovie();
		movie.overview = 'a'.repeat(351);
		const result = getMovieInfo(movie);

		expect(result).toContain('a'.repeat(347) + '...');
	});
});
