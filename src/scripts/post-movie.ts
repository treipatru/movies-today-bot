import { format } from 'date-fns';
import { mastodon } from '../api/mastodon/masto.js';
import { mediaCreate } from '../api/mastodon/requests/media-create.js';
import { statusCreate } from '../api/mastodon/requests/status-create.js';
import { Movie } from '../api/moviedb/entities/movie.js';

function getMovieStatus({
	id,
	overview,
	release_date,
	title,
}: Movie) {
	const line1 = `${title} (${format(new Date(release_date), 'PPP')})`;
	const line2 = overview;
	const line3 = `https://www.themoviedb.org/movie/${id}`;
	const line4 = '#movie #film #cinema';

	return `${line1}\n\n${line2}\n${line3}\n\n${line4}`;
}

export async function postMovie(movie: Movie) {
	const status = getMovieStatus(movie);
	const mediaAlt = `${movie.title} movie poster`;
	let statusAttachment: mastodon.v1.MediaAttachment | null = null;

	if (movie.poster_path !== null) {
		const remotePoster = await fetch(`https://image.tmdb.org/t/p/original/${movie.poster_path}`);
		statusAttachment = await mediaCreate({
			description: mediaAlt,
			file: await remotePoster.blob(),
		});
	}

	await statusCreate({
		status,
		mediaIds: statusAttachment ? [statusAttachment.id] : undefined,
		visibility: process.env.NODE_ENV === 'development'
			? 'private'
			: 'public',
	});

	console.log('Posted movie: ', movie.title);
}
