import { type Movie } from '@/types/moviedb.js';
import { getFormattedDate } from '@/utils/get-formatted-date.js';

/**
 * Get today's best movie
 *
 * @export
 * @param {Movie[]} movies
 * @return {*}  {Movie}
 */
export function getBestMovie(movies: Movie[]): Movie {
	const today = getFormattedDate(new Date()).slice(4, 10);

	const sortedMovies = movies
		/**
		 * Sometimes the release date is not available or
		 * is slightly different from the current date.
		 * This is not something we can control, so best to
		 * filter it out.
		 */
		.filter(movie => movie.release_date.includes(today))
		.sort((a, b) => b.popularity - a.popularity);

	return sortedMovies[0];
}
