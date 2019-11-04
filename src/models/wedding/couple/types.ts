export interface NewlyWed {
	name?: string
	photo?: string | Buffer
}

export interface Couple {
	groom?: NewlyWed
	bride?: NewlyWed
	coupleStory?: string
}
