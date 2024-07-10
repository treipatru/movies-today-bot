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

test('should return expected date when previous day is in another month', () => {
	const targetDate = new Date('2021-04-01');
	const expected = getFormattedDate(new Date('1999-03-31'));

	const result = getAdjacentDayInYear({
		date: targetDate,
		direction: 'previous',
		year: 1999,
	});
	expect(result).toEqual(expected);
});

test('should return expected date when next day is in another month', () => {
	const targetDate = new Date('2021-03-31');
	const expected = getFormattedDate(new Date('1999-04-01'));

	const result = getAdjacentDayInYear({
		date: targetDate,
		direction: 'next',
		year: 1999,
	});
	expect(result).toEqual(expected);
});

test.fails('should NOT return expected date in leap year', () => {
	// TODO: Fix leap year handling

	const targetDate = new Date('2020-02-29');
	const expected = getFormattedDate(new Date('2021-03-01'));

	const result = getAdjacentDayInYear({
		date: targetDate,
		direction: 'next',
		year: 2021,
	});
	expect(result).toEqual(expected);
});
