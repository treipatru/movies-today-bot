import {
	mastoApi,
	mastodon,
} from '../masto.js';

export async function mediaCreate(params: mastodon.rest.v1.CreateMediaAttachmentParams) {
	const response = await mastoApi.v2.media.create(params);
	return response;
}
