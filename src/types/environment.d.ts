declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MASTODON_ACCESS_TOKEN: string;
			MASTODON_BASE_URL: string;
			MOVIEDB_API_KEY: string;
		}
	}
}

export {};
