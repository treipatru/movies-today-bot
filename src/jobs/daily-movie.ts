import { MediaAttachment } from '@/types/mastodon.js';
import { Movie } from '@/types/moviedb.js';
import { appLogger } from '@/utils/logger.js';
import process from 'node:process';
import { getAdjacentDayInYear } from '../actions/movie/get-adjacent-year-date.js';
import { getBestMovieByDate } from '../actions/movie/get-best-movie.js';
import { getMovieInfo } from '../actions/movie/get-movie-info.js';
import { getYearsRange } from '../actions/movie/get-years-range.js';
import { hasPostedToday } from '../actions/post/has-posted-today.js';
import {
	createMedia,
	createStatus,
	getTimeline,
} from '../api/mastodon.js';
import { getDiscoverMovie } from '../api/moviedb.js';

appLogger.info({
	message: 'Starting daily movie job.',
	service: 'system',
});

/**
 * Avoid posting multiple times in a day by checking the timeline.
 */
try {
	const posts = await getTimeline
		.home
		.list({ limit: 1 });
	const hasPosted = hasPostedToday(posts);

	if (hasPosted) {
		appLogger.info({
			message: 'Already posted today, aborting.',
			service: 'system',
		});
		process.exit(0);
	}
} catch (error) {
	appLogger.error({
		error,
		message: 'Failed to check timeline on Mastodon.',
		service: 'mastodon',
	});
	process.exit(1);
}

/**
 * Discover movies via the Movie Database API and
 * get the best movie for today.
 */

let bestMovie: Movie | null = null;
let allMovies: Movie[] = [];

for (const releaseYear of getYearsRange()) {
	try {
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
			'without_genres': '99', // Exclude documentaries
		});

		appLogger.info({
			message: `Got ${discoverResponse.results.length} movies for ${releaseYear}.`,
			service: 'tmdb',
		});

		allMovies = [...allMovies, ...discoverResponse.results];
	} catch (error) {
		appLogger.error({
			error,
			message: `Failed to get movies for ${releaseYear}.`,
			service: 'tmdb',
		});

		process.exit(1);
	}
}

bestMovie = getBestMovieByDate(
	allMovies.flat(),
	new Date(),
);

/**
 * Create a status (text) to post on Mastodon.
 */
const status = getMovieInfo(bestMovie);

/**
 * Fetch the movie poster from the Movie Database API.
 */
let statusAttachment: MediaAttachment | null = null;
let remotePoster: Response;
const remotePosterUrl = `https://image.tmdb.org/t/p/original/${bestMovie.poster_path}`;

try {
	remotePoster = await fetch(remotePosterUrl);
} catch (error) {
	appLogger.error({
		error,
		message: `Failed to fetch movie poster ${remotePosterUrl} .`,
		service: 'tmdb',
	});
	process.exit(1);
}

/**
 * Create the media attachment for the status.
 */
try {
	statusAttachment = await createMedia({
		description: `${bestMovie.title} movie poster`,
		file: await remotePoster.blob(),
	});
} catch (error) {
	appLogger.error({
		error,
		message: 'Failed to create media attachment.',
		service: 'mastodon',
	});
	process.exit(1);
}

/**
 * Post to Mastodon.
 */
try {
	await createStatus({
		status,
		mediaIds: statusAttachment ? [statusAttachment.id] : undefined,
		visibility: 'public',
	});

	appLogger.info({
		message: `Posted movie status - ${bestMovie.title} (${bestMovie.release_date})`,
		service: 'mastodon',
	});
} catch (error) {
	appLogger.error({
		error,
		message: 'Failed to post movie status',
		service: 'mastodon',
	});
	process.exit(1);
}

process.exit(0);
