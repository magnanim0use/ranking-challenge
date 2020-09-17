import ResultsCalculator from '../src/services/results-calculator';
const resultsCalculator = new ResultsCalculator();

test('format results correctly', () => {
	const inputs = [
		`Lions 3, Snakes 3`,
		`Tarantulas 1, FC Awesome 0`,
		`Lions 1, FC Awesome 1`,
		`Tarantulas 3, Snakes 1`,
		`Lions 4, Grouches 0`
	];

	const expectedResults = [
		`1. Tarantulas, 6 pts, gd: 3`,
		`2. Lions, 5 pts, gd: 4`,
		`3. FC Awesome, 1 pt, gd: -1`,
		`4. Snakes, 1 pt, gd: -2`,
		`5. Grouches, 0 pts, gd: -4`
	];


	inputs.forEach((input) => {
		const parsedLine = resultsCalculator.parseLine(input);
		resultsCalculator.getGameResults(parsedLine);
	});

	const sortedResults = resultsCalculator.sortResults();
	expect(sortedResults).toStrictEqual(expectedResults);

});
