import { getDiscoverMovie } from '@/api/moviedb.js';
import { type Movie } from '@/types/moviedb.js';
import { appLogger } from '@/utils/logger.js';
import { getAdjacentDayInYear } from './get-adjacent-year-date.js';
import { getYearsRange } from './get-years-range.js';

export async function getDiscoveryMovies(): Promise<Movie[]> {
	let allMovies: Movie[] = [];
	const years = getYearsRange();

	const promises = years
		.map(async (releaseYear) => {
			/**
			 * The Movie Database API does not have a method to request movies
			 * released on a particular day so we have to specify a range.
			 * If we're interested in movies released on a specific day, we need
			 * to specify the day before and after.
			 */
			const dayBefore = getAdjacentDayInYear({
				date: new Date(),
				direction: 'previous',
				year: releaseYear,
			});
			const dayAfter = getAdjacentDayInYear({
				date: new Date(),
				direction: 'next',
				year: releaseYear,
			});

			/**
			 * Get an array of movies released on today's month and day for the
			 * current release year.
			 */
			const discoverResponse = await getDiscoverMovie({
				'primary_release_date.gte': dayBefore,
				'primary_release_date.lte': dayAfter,
				'sort_by': 'popularity.desc',
				'with_runtime.gte': '80',
				'without_genres': '99,10402', // Exclude and musicals
			});

			appLogger.info({
				message: `Got ${discoverResponse.results.length} movies for ${releaseYear}.`,
				service: 'tmdb',
			});

			return discoverResponse.results;
		});

	try {
		const movies = await Promise.all(promises);

		movies.forEach((yearMovies) => {
			allMovies = [...allMovies, ...yearMovies];
		});
	} catch (error) {
		appLogger.error({
			error,
			message: `Failed to get movies for one or more years`,
			service: 'tmdb',
		});
		throw error;
	}

	return allMovies;
}
