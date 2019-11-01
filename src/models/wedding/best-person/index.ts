import { Schema } from 'mongoose'
import { BestPersonRole } from './types'
const { ObjectId } = Schema.Types

export const BestPersonSchema: Schema = new Schema({
	_id: {
		type: ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	relationToCouple: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: [
			BestPersonRole.BRIDESMAID,
			BestPersonRole.GROOMSMAN,
			BestPersonRole.FLOWER_GIRL,
			BestPersonRole.RING_BEARER,
		],
	},
	photo: {
		type: Buffer,
		required: true,
	},
})

export const BestPeopleSchema: Schema = new Schema({
	groomsmen: [BestPersonSchema],
	bridesmaids: [BestPersonSchema],
	flowerGirls: [BestPersonSchema],
	ringBearers: [BestPersonSchema],
})

export * from './types'
