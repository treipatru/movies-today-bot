import { Status } from '@/types/mastodon.js';
import { faker } from '@faker-js/faker';

function generateAccount(): Status['account'] {
	return {
		acct: faker.internet.userName(),
		avatar: faker.image.avatar(),
		avatarStatic: faker.image.avatar(),
		bot: true,
		createdAt: faker.date.past().toISOString(),
		displayName: '',
		emojis: [],
		fields: [],
		followersCount: faker.number.int(),
		followingCount: faker.number.int(),
		group: false,
		header: '',
		headerStatic: '',
		id: faker.string.alphanumeric(),
		lastStatusAt: faker.date.recent().toISOString(),
		locked: false,
		note: '',
		roles: [],
		statusesCount: faker.number.int(),
		url: '',
		username: faker.internet.userName(),
	};
}

export function generateStatus({
	createdAt,
}: {
	createdAt?: Date;
} = {}): Status {
	const creationString = createdAt?.toISOString()
		?? faker.date.recent().toISOString();

	return {
		account: generateAccount(),
		application: {
			name: faker.company.buzzAdjective(),
		},
		content: faker.lorem.sentence(),
		createdAt: creationString,
		editedAt: null,
		emojis: [],
		favouritesCount: faker.number.int(),
		id: faker.number.int().toString(),
		mediaAttachments: [],
		mentions: [],
		reblogsCount: faker.number.int(),
		repliesCount: faker.number.int(),
		sensitive: faker.datatype.boolean(),
		spoilerText: faker.lorem.sentence(),
		tags: [],
		uri: '',
		visibility: faker
			.helpers
			.arrayElement(['public', 'unlisted', 'private', 'direct']),
	};
}
