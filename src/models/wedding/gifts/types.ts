import { Document } from 'mongoose'

export interface GiftDoc extends Document {
	_id: any
	weddingId: any
	giverName: string
	amount: number
}
