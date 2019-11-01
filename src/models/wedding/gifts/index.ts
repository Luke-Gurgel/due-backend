import mongoose, { Schema, SchemaOptions } from 'mongoose'
import Model from '../../models'
import { GiftDoc } from './types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

export const GiftSchema: Schema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true,
		},
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

export const Gift = mongoose.model<GiftDoc>(Model.GIFT, GiftSchema)
export * from './types'
