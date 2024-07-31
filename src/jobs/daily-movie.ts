import { getBestMovieByDate } from '@/actions/movie/get-best-movie.js';
import { getDiscoveryMovies } from '@/actions/movie/get-discovery-movies.js';
import { getMovieInfo } from '@/actions/movie/get-movie-info.js';
import { getMoviePoster } from '@/actions/movie/get-movie-poster.js';
import { createPostMedia } from '@/actions/post/create-post-media.js';
import { createPost } from '@/actions/post/create-post.js';
import { appLogger } from '@/utils/logger.js';
import process from 'node:process';

appLogger.info({
	message: 'Starting daily movie job.',
	service: 'system',
});

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
