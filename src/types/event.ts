import { WeddingDoc } from './wedding'

export interface Instruction {
	_id: any
	title: string
	message: string
}

export interface Event {
	date: Date
	photos: Buffer[]
	locationName: string
	locationAddress: string
	instructions: Instruction[]
}

export interface UpdateEventDto {
	wedding: WeddingDoc
	event: Event
}
