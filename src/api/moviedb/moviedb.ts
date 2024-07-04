const MOVIEDB_API_URL = 'https://api.themoviedb.org/3';

type FetchMoviedbApiParams = {
	endpoint: string;
	method: 'GET';
	options?: RequestInit;
	searchParams: URLSearchParams;
};

/**
 * Endpoint wrapper for the Movie Database API.
 *
 * @see https://developer.themoviedb.org/reference/intro/getting-started
 */
export async function fetchMoviedbApi({
	endpoint,
	method,
	options = {},
	searchParams,
}: FetchMoviedbApiParams): Promise<Response> {
	options = {
		...options,
		method,
		headers: {
			...options.headers,
			accept: 'application/json',
			Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
		},
	};

	const url = new URL(`${MOVIEDB_API_URL}${endpoint}`);
	url.search = searchParams.toString();
	const response = await fetch(url, options);

	return response;
}
