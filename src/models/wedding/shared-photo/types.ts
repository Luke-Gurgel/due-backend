import { Document } from 'mongoose'

export interface SharedPhotoModel extends Document {
	_id: any
	authorId: any
	weddingId: any
	caption: string
	photo: Buffer
}

export interface SharedPhotoDoc extends SharedPhotoModel, Document {}
