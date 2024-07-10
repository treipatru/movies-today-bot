import { format } from 'date-fns';

/**
 * Wrapper function for date-fns format, to get the date
 * in the format 'yyyy-MM-dd'.
 *
 * @export
 * @param {Date} date
 * @return string
 */
export function getFormattedDate(date: Date): string {
	return format(date, 'yyyy-MM-dd');
}
