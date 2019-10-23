import { Document } from 'mongoose'

export interface GuestDoc extends Document {
	_id: any
	weddingId: any
	name: string
	email: string
	hasRSVP: boolean
	emailSent: boolean
}
