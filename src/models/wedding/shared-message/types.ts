import { Document } from 'mongoose'

export interface SharedMessageModel extends Document {
	_id: any
	weddingId: any
	authorId: any
	message: string
}

export interface SharedMessageDoc extends SharedMessageModel, Document {}
