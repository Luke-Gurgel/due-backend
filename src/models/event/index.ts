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
		required: true,
	},
	location: {
		address: {
			type: String,
			required: true,
		},
		coords: {
			lat: {
				type: Number,
				required: true,
			},
			long: {
				type: Number,
				required: true,
			},
		},
		locationName: String,
	},
	date: {
		type: Date,
	},
	instructions: [InstructionSchema],
})
