import { type Movie } from '@/types/moviedb.js';
import { format } from 'date-fns';

export function getMovieInfo({
	id,
	overview,
	release_date,
	title,
}: Movie) {
	/**
	 * Format the date to a more pleasant format.
	 * @see https://date-fns.org/v3.6.0/docs/format
	 */
	const releaseDate = format(new Date(release_date), 'PPP');

	const movieUrl = `https://www.themoviedb.org/movie/${id}`;

	return `\n
		${title} (${releaseDate})\n
		${overview} \n
		${movieUrl} \n
		#movie #film #cinema
	`;
}
