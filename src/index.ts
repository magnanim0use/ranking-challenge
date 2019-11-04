import * as readline from 'readline';
import * as fs from 'fs';
import ResultsCalculator from './services/results-calculator';

/*
	If input file defined in command line, use as input.
	Otherwise, we will use process.stdin.
*/
const inputFile = process.argv[2];
const resultsCalculator = new ResultsCalculator();

const rl = readline.createInterface(
	{
		input: inputFile ? fs.createReadStream(inputFile) : process.stdin,
		output: process.stdout
	}
);

/*
	Parse line and calculate resulting point increase per line
*/
rl.on('line', (input: any) => {
	const parsedLine = resultsCalculator.parseLine(input);
	return resultsCalculator.getGameResults(parsedLine);
});

rl.on('close', () => {
	const sortedResults = resultsCalculator.sortResults();
	const resultsString = sortedResults.join('\n');
	process.stdout.write(resultsString);
	process.exit(0);
});
