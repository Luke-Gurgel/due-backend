import mongoose, { Schema, SchemaOptions } from 'mongoose'
import { GiftDoc, Model } from 'src/types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

export const GiftSchema: Schema = new Schema(
	{
		weddingId: {
			type: ObjectId,
			required: true,
			ref: Model.WEDDING,
		},
		giverName: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	options,
)

const Gift = mongoose.model<GiftDoc>(Model.GIFT, GiftSchema)
export default Gift
