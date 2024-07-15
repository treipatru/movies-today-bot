import { getBestMovieByDate } from '@/actions/movie/get-best-movie.js';
import { generateMovie } from '@/test/fakers/moviedb.js';

/**
 * Get a new date with a random year but same month and day.
 *
 * @return {*}
 */
function getReleaseDateWithRandomYear() {
	return new Date(
		Math.floor(Math.random() * (2024 - 1950) + 1950),
		0,
		31,
	);
}

/**
 * Generate a list of movies and a best movie.
 *
 * @return {*}
 */
function generateMovies() {
	/**
	 * Generate a lot of random movies with same release day and month
	 * but different years.
	 */
	const movies = Array.from(
		{ length: 100 },
		() =>
			generateMovie({
				maxPopularity: 5000,
				releaseDate: getReleaseDateWithRandomYear(),
			}),
	);

	/**
	 * Create our star production with a higher popularity.
	 */
	const bestMovie = generateMovie({
		minPopularity: 6000,
		releaseDate: getReleaseDateWithRandomYear(),
	});

	return {
		movies,
		bestMovie,
	};
}

test('should return the best movie of the day', () => {
	const { movies, bestMovie } = generateMovies();

	/**
	 * Make sure best movie has a poster image.
	 */
	bestMovie.poster_path = '/example.jpg';

	const result = getBestMovieByDate(
		[...movies, bestMovie],
		getReleaseDateWithRandomYear(),
	);

	expect(result).toBe(bestMovie);
});

test('should ignore movies without a poster image', () => {
	const { movies, bestMovie } = generateMovies();

	/**
	 * Make sure best movie does not have a poster image.
	 */
	bestMovie.poster_path = null;

	const result = getBestMovieByDate(
		[...movies, bestMovie],
		new Date(2024, 0, 31),
	);

	expect(result).not.toBe(bestMovie);
});

test('should ignore movies with a different release date', () => {
	const { movies, bestMovie } = generateMovies();

	/**
	 * Set a different release date for the best movie.
	 */
	bestMovie.release_date = '2024-02-31';

	const result = getBestMovieByDate(
		[...movies, bestMovie],
		new Date(2024, 0, 31),
	);

	expect(result).not.toBe(bestMovie);
});

test('should throw an error if no movies are found', () => {
	expect(() => getBestMovieByDate([], new Date())).toThrowError();
});
