import { format } from 'date-fns';
import { type Movie } from '../../types/moviedb.js';

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
	const formattedDate = format(new Date(release_date), 'PPP');

	const movieUrl = `https://www.themoviedb.org/movie/${id}`;

	return `\n
		${title} (${formattedDate})\n
		${overview} \n
		${movieUrl} \n
		#movie #film #cinema
	`;
}
