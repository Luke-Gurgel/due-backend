export enum BestPersonRole {
	GROOMSMAN = 'GROOMSMAN',
	BRIDESMAID = 'BRIDESMAID',
	FLOWER_GIRL = 'FLOWER_GIRL',
	RING_BEARER = 'RING_BEARER',
}

export interface BestPerson {
	_id: any
	name: string
	relationToCouple: string
	message: string
	role: BestPersonRole
	photo: Buffer
}

export interface BestPeople {
	bridesmaids: BestPerson[]
	groomsmen: BestPerson[]
	flowerGirls: BestPerson[]
	ringBearers: BestPerson[]
}
