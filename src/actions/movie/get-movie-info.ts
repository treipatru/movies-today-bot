import { type Movie } from '@/types/moviedb.js';
import { format } from 'date-fns';

/**
 * Mastodon has a DEFAULT character limit of 500. It can be changed per
 * instance.
 *
 * There is no 'short' version of the overview in the API so we have to
 * approximate a max length for it.
 *
 * @param {string} overview
 * @return {*}  {string}
 */
export function getMovieOverview(overview: string): string {
	if (overview.length <= 350) {
		return overview;
	}

	return `${overview.substring(0, 347)}...`;
}

/**
 * Generate a message with the movie title, release date, overview, and
 * a link to the movie's page on The Movie Database.
 *
 * @export
 * @param {Movie} {
 * 	id,
 * 	overview,
 * 	release_date,
 * 	title,
 * }
 * @return {*}
 */
export function getMovieInfo({
	id,
	overview,
	release_date,
	title,
}: Movie) {
	const line1 = `${title} (${format(new Date(release_date), 'PPP')})`;
	const line2 = getMovieOverview(overview);
	const line3 = `https://www.themoviedb.org/movie/${id}`;
	const line4 = '#movie #film #cinema';

	return `${line1}\n\n${line2}\n${line3}\n\n${line4}`;
}
