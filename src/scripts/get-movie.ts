import { format } from 'date-fns';
import { type Movie } from '../api/moviedb/entities/movie.js';
import { discoverMovie } from '../api/moviedb/requests/discover-movie.js';

/**
 * Production years should be from 1950 to the previous year.
 * Development years should be shorter to avoid spamming the API.
 */

const START_YEAR = process.env.NODE_ENV === 'development'
	? 1980
	: 1950;
const YEARS_LENGTH = process.env.NODE_ENV === 'development'
	? 10
	: new Date().getFullYear() - 1950;

const RELEASE_YEARS = Array.from(
	{ length: YEARS_LENGTH },
	(_, i) => i + START_YEAR,
);

function pickTodaysMovie(movies: Movie[]): Movie {
	const today = new Date();
	const sortedMovies = movies
		.filter(movie => movie.release_date.includes(today.toISOString().slice(4, 10)))
		.sort((a, b) => b.popularity - a.popularity);

	return sortedMovies[0];
}

function getGteDate(year: number) {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	date.setFullYear(year);

	return format(date, 'yyyy-MM-dd');
}

function getLteDate(year: number) {
	const date = new Date();
	date.setDate(date.getDate() + 1);
	date.setFullYear(year);

	return format(date, 'yyyy-MM-dd');
}

export async function getMovie(): Promise<Movie> {
	const movies = await Promise
		.all(
			RELEASE_YEARS
				.map(async year => {
					const discoverResponse = await discoverMovie({
						'primary_release_date.gte': getGteDate(year),
						'primary_release_date.lte': getLteDate(year),
					});

					return discoverResponse.results;
				}),
		);

	return pickTodaysMovie(movies.flat());
}
