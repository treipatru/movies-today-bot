import { getBestMovieByDate } from '@/actions/movie/get-best-movie.js';
import { getDiscoveryMovies } from '@/actions/movie/get-discovery-movies.js';
import { getMovieInfo } from '@/actions/movie/get-movie-info.js';
import { getMoviePoster } from '@/actions/movie/get-movie-poster.js';
import { createPostMedia } from '@/actions/post/create-post-media.js';
import { createPost } from '@/actions/post/create-post.js';
import { getLastPost } from '@/actions/post/get-last-post.js';
import { isAllowedToPost } from '@/actions/post/is-allowed-to-post.js';
import { appLogger } from '@/utils/logger.js';
import process from 'node:process';

appLogger.info({
	message: 'Starting daily movie job.',
	service: 'system',
});

/**
 * Get timeline posts and check if the bot is allowed to post.
 */

const lastPost = await getLastPost();
if (
	lastPost
	&& isAllowedToPost([lastPost]) === false
) {
	appLogger.info({
		message: 'Not allowed to post right now, exiting.',
		service: 'system',
	});
	process.exit(0);
}

/**
 * Discover movies via the Movie Database API and
 * pick a movie to post.
 */

const allMovies = await getDiscoveryMovies();
const bestMovie = getBestMovieByDate(
	allMovies.flat(),
	new Date(),
);

/**
 * If we are in development mode, log the movie and exit.
 */
if (process.env.NODE_ENV === 'development') {
	appLogger.info({
		message: 'In dev mode, aborting post.',
		service: 'system',
	});
	process.exit(0);
}

/**
 * Prepare the status and create the media attachment.
 */
const status = getMovieInfo(bestMovie);
const remotePoster = await getMoviePoster(`https://image.tmdb.org/t/p/original/${bestMovie.poster_path}`);
const statusAttachment = await createPostMedia({
	description: `${bestMovie.title} movie poster`,
	file: await remotePoster.blob(),
});

/**
 * Post to Mastodon.
 */
await createPost({
	status,
	statusAttachment,
});

process.exit(0);
