import { Schema, SchemaOptions } from 'mongoose'

const options: SchemaOptions = { timestamps: true }

export const PreWeddingPhotoSchema: Schema = new Schema(
	{
		photo: {
			type: Buffer,
			required: true,
		},
	},
	options,
)
