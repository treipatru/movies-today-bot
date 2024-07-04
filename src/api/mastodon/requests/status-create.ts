import {
	mastoApi,
	mastodon,
} from '../masto.js';

export async function statusCreate(params: mastodon.rest.v1.CreateStatusParams) {
	await mastoApi.v1.statuses.create(params);
}
