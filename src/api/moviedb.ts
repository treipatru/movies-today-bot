import * as process from 'node:process';
import {
	type DiscoverMovieSearchParams,
	type MovieDbClientParams,
	type PaginatedMovies,
	paginatedMoviesSchema,
} from '../types/moviedb.js';

/**
 * Endpoint wrapper for the Movie Database API
 *
 * @see https://developer.themoviedb.org/reference/intro/getting-started
 */
async function movieDbClient({
	endpoint,
	method,
	options = {},
	searchParams,
}: MovieDbClientParams): Promise<Response> {
	options = {
		...options,
		method,
		headers: {
			...options.headers,
			accept: 'application/json',
			Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
		},
	};

	const url = new URL(`${process.env.MOVIEDB_API_URL}${endpoint}`);
	url.search = searchParams.toString();
	const response = await fetch(url, options);

	return response;
}

// ==============================
// MovieDB endpoints

/*
 * Movie discovery endpoint.
 *
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
export async function getDiscoverMovie(
	searchParams: DiscoverMovieSearchParams = {},
): Promise<PaginatedMovies> {
	const response = await movieDbClient({
		endpoint: '/discover/movie',
		method: 'GET',
		searchParams: new URLSearchParams(searchParams),
	});

	const resJSON = await response.json();
	const data = paginatedMoviesSchema.parse(resJSON);

	return data;
}
