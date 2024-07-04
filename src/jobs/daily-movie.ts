import { differenceInHours } from 'date-fns';
import { mastoApi, mastodon } from '../api/mastodon/masto.js';
import { getMovie } from '../scripts/get-movie.js';
import { postMovie } from '../scripts/post-movie.js';

function hasPostedToday(posts: mastodon.v1.Status[]) {
	if (posts.length === 0) {
		return false;
	}

	const now = new Date();
	const hoursDiff = differenceInHours(now, posts[0].createdAt);

	return hoursDiff < 24;
}

export async function dailyMovie() {
	const posts = await mastoApi
		.v1
		.timelines
		.home
		.list({ limit: 1 });
	const hasPosted = hasPostedToday(posts);

	if (hasPosted) {
		console.log('Already posted today.');
		return;
	}

	const movie = await getMovie();
	await postMovie(movie);
}
