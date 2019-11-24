import { WeddingDoc } from './wedding'

export interface Couple {
	groomName?: string
	groomPhoto?: string | Buffer
	brideName?: string
	bridePhoto?: string | Buffer
	coupleStory?: string
}

export interface UpdateCoupleDto {
	wedding: WeddingDoc
	couple: Couple
}
