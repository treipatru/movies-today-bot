declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MOVIEDB_API_KEY: string;
			MASTODON_ACCESS_TOKEN: string;
			MASTODON_BASE_URL: string;
		}
	}
}

export {};
