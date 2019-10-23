import { Document } from 'mongoose'

export interface SharedPhotoDoc extends Document {
	_id: any
	weddingId: any
	authorId: any
	photo: Buffer
	caption: string
}
