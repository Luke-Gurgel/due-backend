import mongoose, { Schema, SchemaOptions } from 'mongoose'
import { SharedPhotoDoc, Model } from 'src/types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

export const SharedPhotoSchema: Schema = new Schema(
	{
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

const SharedPhoto = mongoose.model<SharedPhotoDoc>(Model.SHARED_PHOTO, SharedPhotoSchema)
export default SharedPhoto
