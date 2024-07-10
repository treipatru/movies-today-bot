import { getMovieInfo } from '@/actions/movie/get-movie-info.js';
import { generateMovie } from '@/fakers/moviedb.js';

test('should return the movie info', () => {
	const movie = generateMovie({
		releaseDate: new Date('1986-05-16'),
	});
	const movieUrl = `https://www.themoviedb.org/movie/${movie.id}`;
	const result = getMovieInfo(movie);

	const expected = `\n
		${movie.title} (May 16th, 1986)\n
		${movie.overview} \n
		${movieUrl} \n
		#movie #film #cinema
	`;
	expect(result).toEqual(expected);
});
