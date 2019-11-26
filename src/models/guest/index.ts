import mongoose, { Schema } from 'mongoose'
import { GuestDoc, Model } from 'src/types'

const { ObjectId } = Schema.Types

export const GuestSchema: Schema = new Schema({
	weddingId: {
		type: ObjectId,
		required: true,
		ref: Model.WEDDING,
		immutable: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	hasRSVP: {
		type: Boolean,
		required: true,
		default: false,
	},
	emailSent: {
		type: Boolean,
		required: true,
		default: false,
	},
})

const Guest = mongoose.model<GuestDoc>(Model.GUEST, GuestSchema)
export default Guest
