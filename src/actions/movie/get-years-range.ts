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
 * Generate an array of years from 1950 to the previous year.
 * If the environment is development, return only 10 years.
 *
 * @export
 * @return {number[]} An array of years
 */
export function getYearsRange(): number[] {
	return Array.from(
		{ length: YEARS_LENGTH },
		(_, i) => i + START_YEAR,
	);
}
