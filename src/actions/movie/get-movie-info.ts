import { type Movie } from '@/types/moviedb.js';
import { format } from 'date-fns';

export function getMovieInfo({
	id,
	overview,
	release_date,
	title,
}: Movie) {
	const line1 = `${title} (${format(new Date(release_date), 'PPP')})`;
	/**
	 * Mastodon has a DEFAULT character limit of 500. It can be changed per
	 * instance.
	 *
	 * There is no 'short' version of the overview in the API so we have to
	 * approximate a max length for it.
	 */
	const line2 = overview.substring(0, 350);
	const line3 = `https://www.themoviedb.org/movie/${id}`;
	const line4 = '#movie #film #cinema';

	return `${line1}\n\n${line2}\n${line3}\n\n${line4}`;
}
