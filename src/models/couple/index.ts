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

	if (this.coupleStory) progress += 0.2

	// if (this.bride) {
	// 	if (this.bride.name) progress += 0.2
	// 	if (this.bride.photo) progress += 0.2
	// }

	// if (this.groom) {
	// 	if (this.groom.name) progress += 0.2
	// 	if (this.groom.photo) progress += 0.2
	// }

	return progress.toFixed(2)
})
