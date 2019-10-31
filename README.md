This app will read a list of games and scores, either from a specified text file, or from the command line, and return a sorted and numbered list of teams, in descending order, according to the total amount of points awarded (3 points for each game won, 1 point for each game tied, and 0 if lost).

Set-up

`
	git clone https://github.com/mtcrushmore/ranking-challenge
	npm install
`

To transpile and run from the Typescript src file, run
`
	npm run start
`

To define an input text file, run
`
	npm run start <name of file>
`

Example (assuming sample-input.txt is in your repo root directory):
`
	npm run start sample-input.txt
`

To run tests: (using Jest)
`
	npm test
`