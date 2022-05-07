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
	summary: string
	updated: number
	_links: { self: [Object]; previousepisode: [Object] }
}
