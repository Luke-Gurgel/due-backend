import { Document } from 'mongoose'

export interface SharedMessageDoc extends Document {
	_id: any
	weddingId: any
	authorId: any
	message: string
}
