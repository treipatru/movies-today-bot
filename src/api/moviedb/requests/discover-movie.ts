import {
	type PaginatedMovies,
	paginatedMoviesSchema,
} from '../entities/movie.js';
import { fetchMoviedbApi } from '../moviedb.js';

type DiscoverMovieSearchParamsKeys =
	| 'include_adult'
	| 'include_video'
	| 'language'
	| 'page'
	| 'primary_release_date.gte'
	| 'primary_release_date.lte'
	| 'sort_by'
	| 'with_runtime.gte'
	| 'without_genres';

type DiscoverMovieSearchParams = Partial<Record<DiscoverMovieSearchParamsKeys, string>>;

/*
 * Movie discovery endpoint.
 *
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
export async function discoverMovie(
	searchParams: DiscoverMovieSearchParams = {},
): Promise<PaginatedMovies> {
	const response = await fetchMoviedbApi({
		endpoint: '/discover/movie',
		method: 'GET',
		searchParams: new URLSearchParams(searchParams),
	});

	const resJSON = await response.json();
	const data = paginatedMoviesSchema.parse(resJSON);

	return data;
}
