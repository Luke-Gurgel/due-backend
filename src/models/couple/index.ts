import { Schema, SchemaOptions } from 'mongoose'
import { Couple } from 'src/types'

const schemaOptions: SchemaOptions = {
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
}

export const CoupleSchema: Schema = new Schema(
	{
		groomName: {
			type: String,
			trim: true,
		},
		groomPhoto: {
			type: Buffer,
		},
		brideName: {
			type: String,
			trim: true,
		},
		bridePhoto: {
			type: Buffer,
		},
		coupleStory: {
			type: String,
			trim: true,
		},
	},
	schemaOptions,
)

CoupleSchema.virtual('progress').get(function(this: Couple) {
	let progress = 0.0

	if (this.brideName) progress += 0.2
	if (this.groomName) progress += 0.2
	if (this.bridePhoto) progress += 0.2
	if (this.groomPhoto) progress += 0.2
	if (this.coupleStory) progress += 0.2

	return progress.toFixed(2)
})
