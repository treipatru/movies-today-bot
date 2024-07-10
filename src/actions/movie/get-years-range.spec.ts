import { getYearsRange } from '@/actions/movie/get-years-range.js';

test('should return the range of years', () => {
	const result = getYearsRange(1950, 1955);
	const expected = [1950, 1951, 1952, 1953, 1954, 1955];
	expect(result).toEqual(expected);
});
