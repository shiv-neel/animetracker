export interface Anime {
	id: number
	url: string
	name: string
	type: string
	language: string
	genres: string | string[]
	status: string
	runtime: number
	averageRuntime: number
	premiered: string
	ended: string
	officialSite: string
	schedule: any
	rating: { average: number }
	weight: number
	network: any
	webChannel: null
	dvdCountry: null
	externals: any
	image: {
		medium: string
		original: string
	}
	summary: '<p>Struggling manga author Satoru Fujinuma is beset by his fear to express himself. However, he has a supernatural ability of being forced to prevent deaths and catastrophes by being sent back in time before the incident occurred, repeating time until the accident is prevented. One day, he gets involved in an accident that has him framed as a murderer. Desperate to save the victim, he sends himself back in time only to find himself as a grade-schooler one month before fellow classmate Kayo Hinazuki went missing. Satoru now embarks on a new quest: to save Kayo and solve the mystery behind her disappearance.</p>'
	updated: 1629208022
	_links: { self: [Object]; previousepisode: [Object] }
}
