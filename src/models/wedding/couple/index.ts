import { Schema } from 'mongoose'

export const NewlyWedSchema: Schema = new Schema({
	name: {
		type: String,
	},
	photo: {
		type: Buffer,
	},
})

export const CoupleSchema: Schema = new Schema({
	groom: NewlyWedSchema,
	bride: NewlyWedSchema,
	coupleStory: {
		type: String,
		trim: true,
	},
})

export * from './types'
