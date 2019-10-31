import { 
	map,
	orderBy,
	reverse
} from 'lodash';

export default class ResultsCalculator {

	results: object = {}

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

	addScore (team: string, score: number) {
		this.results[team] = this.results[team] ?
			this.results[team] + score :
			score;
	}

	getGameResults (teams: Array<string>) {
		const team1 = this.parseName(teams[0]);
		const team2 = this.parseName(teams[1]);

		const score1 = this.parseScore(teams[0]);
		const score2 = this.parseScore(teams[1]);

		let team1Points;
		let team2Points;

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

		this.addScore(team1, team1Points);
		this.addScore(team2, team2Points);
	}

	sortResults () {
		const totalScores = map(
			this.results,
			(score, name) => {
				return {
					name,
					score
				}
			}
		);

		const orderedScores = reverse(
			orderBy(
				totalScores,
				(obj) => obj.score
			)
		);

		let order = 1;
		return map(
			orderedScores,
			({ name, score }) => {
				return `${order ++}. ${name} ${score}`;
			}
		)
	}
}