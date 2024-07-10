import { type Movie } from '@/types/moviedb.js';
import { appLogger } from '@/utils/logger.js';
import { getDate, getMonth } from 'date-fns';

/**
 * Get today's best movie
 *
 * @export
 * @param {Movie[]} movies
 * @return {*}  {Movie}
 */
export function getBestMovieByDate(movies: Movie[], date: Date): Movie {
	const filteredMovies = movies
		/**
		 * Sometimes the release date is not available or
		 * is slightly different from the current date.
		 * This is not something we can control, so best to
		 * filter it out.
		 */
		.filter(({ release_date }) => {
			return (
				getMonth(release_date) === getMonth(date)
				&& getDate(release_date) === getDate(date)
			);
		})
		/**
		 * Some movies don't have a poster image, so we exclude them as we
		 * always want to post an attached image.
		 * Most movies have a poster, those that don't are usually not
		 * popular or are not yet released.
		 */
		.filter(movie => movie.poster_path !== null);

	if (filteredMovies.length === 0) {
		appLogger.error({
			message: 'No movies found for today.',
			service: 'system',
		});
		throw new Error('No movies found for today.');
	}

	/**
	 * Pick the movie with the highest popularity.
	 * This metric is provided by the Movie Database API.
	 */
	const bestMovie = filteredMovies
		.reduce((prev, current) => {
			return (current.popularity > prev.popularity) ? current : prev;
		});

	return bestMovie;
}
