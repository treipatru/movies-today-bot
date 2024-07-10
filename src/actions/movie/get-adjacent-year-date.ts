import { getFormattedDate } from '@/utils/get-formatted-date.js';

type AdjacentYear = 'previous' | 'next';

/**
 * TODO: Take leap years into consideration.
 *
 * Individual months have the same length in days every year.
 * Except for February, obviously.
 */

export function getAdjacentYearDate(year: number, direction: AdjacentYear) {
	const date = new Date();

	switch (direction) {
		case 'previous':
			date.setFullYear(year - 1);
			break;
		case 'next':
			date.setFullYear(year + 1);
			break;
	}

	return getFormattedDate(date);
}
