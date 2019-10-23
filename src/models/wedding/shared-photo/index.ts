import mongoose, { Schema, SchemaOptions } from 'mongoose'
import Model from '../../models'
import { SharedPhotoDoc } from './types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

export const SharedPhotoSchema: Schema = new Schema(
	{
		id: {
			type: ObjectId,
			required: true,
		},
		weddingId: {
			type: ObjectId,
			required: true,
			ref: Model.WEDDING,
		},
		authorId: {
			type: ObjectId,
			required: true,
			ref: Model.USER,
		},
		photo: {
			type: Buffer,
			required: true,
		},
		caption: String,
	},
	options,
)

export const SharedPhotoModel = mongoose.model<SharedPhotoDoc>(
	Model.SHARED_PHOTO,
	SharedPhotoSchema,
)
export * from './types'
