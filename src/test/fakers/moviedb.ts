import { Movie } from '@/types/moviedb.js';
import { getFormattedDate } from '@/utils/get-formatted-date.js';
import { faker } from '@faker-js/faker';

/**
 * Possible languages for the movie.
 *
 * @enum
 */
enum Language {
	EN = 'en',
	ES = 'es',
	FR = 'fr',
	DE = 'de',
	IT = 'it',
}

/**
 * Options for generating a movie object as returned by the API.
 *
 * @interface GenerateMovieOptions
 */
interface GenerateMovieOptions {
	maxPopularity?: number;
	minPopularity?: number;
	releaseDate?: Date;
}

export function generateMovie({
	maxPopularity,
	minPopularity,
	releaseDate,
}: GenerateMovieOptions = {}): Movie {
	const releasedOn = releaseDate || faker.date.between({ from: '1950-01-01', to: '2023-12-31' });
	const hasPosterPath = faker.datatype.boolean();

	return {
		adult: false, // Adult is always false
		backdrop_path: '/backdrop-example.jpg',
		genre_ids: faker.helpers.multiple(() => {
			return faker.number.int({ min: 1, max: 1000 });
		}),
		id: faker.number.int({
			min: 1,
			max: 99999,
		}),
		original_language: faker.helpers.enumValue(Language),
		original_title: faker.lorem.words({
			min: 1,
			max: 5,
		}),
		overview: faker.lorem.paragraph({
			min: 1,
			max: 10,
		}),
		popularity: faker.number.float({
			max: maxPopularity || 9999.999,
			min: minPopularity || 0.001,
			multipleOf: 0.001,
		}),
		poster_path: hasPosterPath ? '/poster-example.jpg' : null,
		release_date: getFormattedDate(releasedOn),
		title: faker.lorem.words({
			min: 1,
			max: 5,
		}),
		video: false, // Video is always false
		vote_average: faker.number.float({
			max: 10,
			min: 1,
			multipleOf: 0.001,
		}),
		vote_count: faker.number.int({
			max: 9999999,
			min: 1,
		}),
	};
}
