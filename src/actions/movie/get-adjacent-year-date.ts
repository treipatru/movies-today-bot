import { getFormattedDate } from '@/utils/get-formatted-date.js';

type Direction = 'previous' | 'next';

/**
 * Using a given date, get the adjacent day in a specified year.
 *
 * TODO: Take leap years into consideration.
 * Individual months have the same length in days every year.
 * Except for February, obviously.
 *
 * @export
 * @param {{
 * 	date: Date;
 * 	direction: Direction;
 * 	year: number;
 * }} {
 * 	date,
 * 	direction,
 * 	year,
 * }
 * @return {*} Formatted date string
 */
export function getAdjacentDayInYear({
	date,
	direction,
	year,
}: {
	date: Date;
	direction: Direction;
	year: number;
}): string {
	const newDate = new Date(date);
	newDate.setFullYear(year);

	switch (direction) {
		case 'previous':
			newDate.setDate(date.getDate() - 1);
			break;
		case 'next':
			newDate.setDate(date.getDate() + 1);
			break;
	}

	return getFormattedDate(newDate);
}
