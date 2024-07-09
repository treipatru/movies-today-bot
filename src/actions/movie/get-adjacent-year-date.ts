import { format } from 'date-fns';

type AdjacentYear = 'previous' | 'next';

/**
 * TODO: Take leap years into consideration.
 *
 * Individual months have the same length in days every year.
 * Except for February, obviously.
 */

export function getAdjacentYearDate(year: number, direction: AdjacentYear) {
	const date = new Date();

	if (direction === 'previous') {
		date.setDate(date.getDate() - 1);
		date.setFullYear(year);
	} else {
		date.setDate(date.getDate() + 1);
	}

	return format(date, 'yyyy-MM-dd');
}
