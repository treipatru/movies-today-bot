import { getAdjacentDayInYear } from '@/actions/movie/get-adjacent-year-date.js';
import { getFormattedDate } from '@/utils/get-formatted-date.js';

test("should return yesterday's date of the given year", () => {
	const today = new Date();
	const expected = getFormattedDate(
		new Date(
			2021,
			today.getMonth(),
			today.getDate() - 1,
		),
	);

	const result = getAdjacentDayInYear({
		date: today,
		direction: 'previous',
		year: 2021,
	});
	expect(result).toEqual(expected);
});

test("should return tomorrow's date of the given year", () => {
	const today = new Date();
	const expected = getFormattedDate(
		new Date(
			2023,
			today.getMonth(),
			today.getDate() + 1,
		),
	);

	const result = getAdjacentDayInYear({
		date: today,
		direction: 'next',
		year: 2023,
	});
	expect(result).toEqual(expected);
});
