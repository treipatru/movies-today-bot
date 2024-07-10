import * as process from 'node:process';

/**
 * Production years should be from 1950 to the previous year.
 * Development years should be shorter to avoid spamming the API.
 */

const START_YEAR = process.env.NODE_ENV === 'development'
	? 1980
	: 1950;

const YEARS_LENGTH = process.env.NODE_ENV === 'development'
	? 10
	: new Date().getFullYear() - 1950;

/**
 * Generate an array of years.
 * If no params are specified it returns all years from 1950 to the
 * previous year.
 *
 * If the environment is development, return only 10 years.
 *
 * @export
 * @param {number} [first=START_YEAR]
 * @param {number} [last=START_YEAR + YEARS_LENGTH - 1]
 * @return {*}  {number[]}
 */
export function getYearsRange(
	first: number = START_YEAR,
	last: number = START_YEAR + YEARS_LENGTH - 1,
): number[] {
	return Array.from(
		{ length: last - first + 1 },
		(_, index) => first + index,
	);
}
