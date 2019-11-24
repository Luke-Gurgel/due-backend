import { Document } from 'mongoose'
import { WeddingDoc } from './wedding'

export interface GuestModel {
	readonly weddingId: any
	_id: any
	name: string
	email: string
	hasRSVP: boolean
	emailSent: boolean
}

export interface GuestDoc extends GuestModel, Document {
	[key: string]: any
}

export interface AddGuestDto {
	wedding: WeddingDoc
	newGuest: {
		name: string
		email: string
	}
}

export interface UpdateGuestDto {
	guestId: string
	fields: {
		name?: string
		email?: string
		hasRSVP?: boolean
		emailSent?: boolean
	}
}

export interface DeleteGuestDto {
	guestId: string
}
