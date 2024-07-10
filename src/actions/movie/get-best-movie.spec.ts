import { getBestMovie } from '@/actions/movie/get-best-movie.js';
import { generateMovie } from '@/fakers/moviedb.js';

test('should return the best movie of the day', () => {
	const today = new Date();
	const mmDD = `${today.getMonth() + 1}-${today.getDate()}`;

	const movies = [
		generateMovie({
			releaseDate: new Date(`1958-${mmDD}`),
			minPopularity: 10,
			maxPopularity: 20,
		}),
		generateMovie({
			releaseDate: new Date(`1979-${mmDD}`),
			minPopularity: 40,
			maxPopularity: 90,
		}),
		generateMovie({
			releaseDate: new Date(`1999-${mmDD}`),
			minPopularity: 2300,
			maxPopularity: 5000,
		}),
		generateMovie({
			releaseDate: new Date(`2020-04-05`),
			minPopularity: 6000,
			maxPopularity: 9999,
		}),
	];

	const result = getBestMovie(movies);
	const expected = movies[2];

	expect(result).toEqual(expected);
});
