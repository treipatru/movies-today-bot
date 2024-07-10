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

/**
 * Avoid posting multiple times in a day by checking the timeline.
 */
const posts = await getTimeline
	.home
	.list({ limit: 1 });
const hasPosted = hasPostedToday(posts);

if (hasPosted) {
	console.log('Already posted today.');
	process.exit(0);
}

/**
 * Discover movies via the Movie Database API and
 * get the best movie for today.
 */

const releaseYears = getYearsRange();
const moviesFromThisDate = await Promise
	.all(
		releaseYears
			.map(async releaseYear => {
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
					'with_runtime.gte': '60',
					'without_genres': '99', // Exclude documentaries
				});

				return discoverResponse.results;
			}),
	);

const bestMovie = getBestMovieByDate(
	moviesFromThisDate.flat(),
	new Date(),
);

/**
 * Create a status to post on Mastodon
 */
const status = getMovieInfo(bestMovie);

/**
 * Attach a movie poster to the status. The bestMovie will always have a poster.
 */
const remotePoster = await fetch(`https://image.tmdb.org/t/p/original/${bestMovie.poster_path}`);
const statusAttachment = await createMedia({
	description: `${bestMovie.title} movie poster`,
	file: await remotePoster.blob(),
});

/**
 * Post to Mastodon.
 */
await createStatus({
	status,
	mediaIds: statusAttachment ? [statusAttachment.id] : undefined,
	visibility: 'public',
});

console.log('Posted movie: ', bestMovie.title);
process.exit(0);
