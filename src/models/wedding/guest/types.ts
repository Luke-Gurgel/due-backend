import { Document } from 'mongoose'

export interface GuestModel {
	_id: any
	weddingId: any
	name: string
	email: string
	hasRSVP: boolean
	emailSent: boolean
}

export interface GuestDoc extends GuestModel, Document {}
