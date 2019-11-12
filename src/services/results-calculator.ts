import { 
	map,
	orderBy,
	reverse
} from 'lodash';

export default class ResultsCalculator {

	results: {
		[key:string]: {
			name: string,
			totalScore: number,
			gd: number
		}
	} = {}

	// results: {
	// 	name: object
	// }

	/*
	{
		Tarantulas: {
			name: 'Tarantulas',
			totalScore: 6,
			goalsWon: 4, 
			goalsLost: 1
		}
	}
	*/

	parseLine (line: string) {
		return line.split(', ');
	}

	parseName (team: string) {
		return team.substring(0, team.length - 2);
	}

	parseScore (team: string) {
		return Number(
			team.substring(team.length - 1)
		);
	}

	addScore (team: string, score: number, gd: number) {
		// this.results[team] = this.results[team] ?
		// 	this.results[team] + score :
		// 	score;
		this.results[team] = this.results[team] ? 
			{
				name: team,
				totalScore: this.results[team].totalScore + score,
				gd: this.results[team].gd + gd
			}
		: 
			{
				name: team,
				totalScore: score,
				gd
			}
	}

	getGameResults (teams: Array<string>) {
		const team1: string = this.parseName(teams[0]);
		const team2: string = this.parseName(teams[1]);

		const score1: number = this.parseScore(teams[0]);
		const score2: number = this.parseScore(teams[1]);

		let team1Points: number;
		let team2Points: number;

		if (score1 === score2) {
			team1Points = 1;
			team2Points = 1;
		} else if (score1 > score2) {
			team1Points = 3;
			team2Points = 0;
		} else {
			team1Points = 0;
			team2Points = 3;
		}

		this.addScore(team1, team1Points, score1 - score2);
		this.addScore(team2, team2Points, score2 - score1);
	}

	sortResults () {
		const totalScores = map(
			this.results,
			({ name, totalScore, gd }, team) => {
				return {
					name,
					totalScore,
					gd
				}
			}
		);

		const orderedScores = reverse(
			orderBy(
				totalScores,
				// (obj) => obj.totalScore
				[ 'totalScore', 'gd' ]
			)
		);

		let order: number = 1;
		let previousScore: number;
		let previousGd: number;

		return map(
			orderedScores,
			({ name, totalScore, gd }, index) => {
				const nameAndScore = `${name} ${totalScore}`;

				/*
					Don't increment ranking if team is tied with previous entry.
				*/
				if (previousScore && previousScore > totalScore ||
					(previousScore === totalScore && previousGd > gd)
				) {
					order = index + 1;
				}

				previousScore = totalScore;
				previousGd = gd;
				const pointTerminology = totalScore === 1 ? 'pt' : 'pts';


				return `${order}. ${name}, ${totalScore} ${ pointTerminology }, gd: ${gd}`;
			}
		)
	}
}