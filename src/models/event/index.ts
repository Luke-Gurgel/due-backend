import { Schema } from 'mongoose'

export const InstructionSchema: Schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	message: String,
})

export const EventSchema: Schema = new Schema({
	photos: {
		type: [Buffer],
	},
	locationAddress: {
		type: String,
	},
	locationName: {
		type: String,
	},
	date: {
		type: Date,
	},
	instructions: [InstructionSchema],
})
