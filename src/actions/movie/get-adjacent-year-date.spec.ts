import { getAdjacentYearDate } from '@/actions/movie/get-adjacent-year-date.js';
import { getFormattedDate } from '@/utils/get-formatted-date.js';

test("should return the previous year's date", () => {
	const today = new Date();
	const expected = getFormattedDate(new Date(2021, today.getMonth(), today.getDate()));

	const result = getAdjacentYearDate(2022, 'previous');
	expect(result).toEqual(expected);
});

test("should return the next year's date", () => {
	const today = new Date();
	const expected = getFormattedDate(new Date(2023, today.getMonth(), today.getDate()));

	const result = getAdjacentYearDate(2022, 'next');
	expect(result).toEqual(expected);
});
