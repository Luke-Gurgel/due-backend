import mongoose, { Schema, SchemaOptions } from 'mongoose'
import { SharedMessageDoc, Model } from 'src/types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

export const SharedMessageSchema: Schema = new Schema(
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
		message: {
			type: String,
			required: true,
		},
	},
	options,
)

const SharedMessage = mongoose.model<SharedMessageDoc>(Model.SHARED_MESSAGE, SharedMessageSchema)
export default SharedMessage
