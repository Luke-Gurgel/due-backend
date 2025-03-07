import { Schema } from 'mongoose'
import { BestPersonRole } from 'src/types'

export const BestPersonSchema: Schema = new Schema({
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
