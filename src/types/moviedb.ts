import { z } from 'zod';

/**
 * Zod schema for a movie object.
 */
const movieSchema = z
	.object({
		adult: z.boolean(),
		backdrop_path: z.string().nullable(),
		genre_ids: z.array(z.number()),
		id: z.number(),
		original_language: z.string(),
		original_title: z.string(),
		overview: z.string(),
		popularity: z.number(),
		poster_path: z.string().nullable(),
		release_date: z.string(),
		title: z.string(),
		video: z.boolean(),
		vote_average: z.number(),
		vote_count: z.number(),
	});

/**
 * A Movie entity from the Movie Database API.
 */
export type Movie = z.infer<typeof movieSchema>;

/**
 * Zod schema for a paginated list of movies.
 */
export const paginatedMoviesSchema = z
	.object({
		page: z.number(),
		results: z.array(movieSchema),
		total_pages: z.number(),
		total_results: z.number(),
	});

/**
 * A paginated list of movies from the Movie Database API.
 */
export type PaginatedMovies = z.infer<typeof paginatedMoviesSchema>;

/**
 * Search parameters KEYS for the `discover-movie` endpoint.
 * Contains only a subset of possible keys.
 * See official documentation for a complete list.
 *
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
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

/**
 * Search parameters for the `discover-movie` endpoint.
 */
export type DiscoverMovieSearchParams = Partial<Record<DiscoverMovieSearchParamsKeys, string>>;

/**
 * Movie Database API client parameters.
 *
 * @export
 * @interface MovieDbClientParams
 */
export interface MovieDbClientParams {
	endpoint: string;
	method: 'GET';
	options?: RequestInit;
	searchParams: URLSearchParams;
}
