import { type Movie } from '@/types/moviedb.js';
import { format } from 'date-fns';

export function getMovieInfo({
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
