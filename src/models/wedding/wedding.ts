/* eslint-disable @typescript-eslint/no-use-before-define */
import mongoose, { Schema, SchemaOptions } from 'mongoose'
import { CoupleSchema } from './couple'
import { EventSchema } from './event'
import { PreWeddingPhotoSchema } from './pre-wedding-photo'
import { BestPeopleSchema } from './best-person'
import Model from '../models'
import { WeddingDoc, DueEventStatus, GuestVersion } from './types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

const WeddingSchema: Schema = new Schema(
	{
		ownerId: {
			type: ObjectId,
			required: true,
			ref: Model.USER,
		},
		status: {
			type: String,
			enum: [DueEventStatus.ACTIVE, DueEventStatus.INACTIVE],
			default: DueEventStatus.INACTIVE,
		},
		eventName: {
			type: String,
			trim: true,
		},
		qrCode: {
			type: Buffer,
		},
		stripeAccount: {
			type: String,
		},
		trailer: {
			type: Buffer,
		},
		couple: {
			type: CoupleSchema,
		},
		event: {
			type: EventSchema,
		},
		bestPeople: {
			type: BestPeopleSchema,
		},
		preWeddingPhotos: {
			type: [PreWeddingPhotoSchema],
			default: undefined,
		},
		// admin (people allowed to manage the event)
	},
	options,
)

WeddingSchema.virtual('sharedMessages', {
	ref: Model.SHARED_MESSAGE,
	localField: '_id',
	foreignField: 'weddingId',
})

WeddingSchema.virtual('sharedPhotos', {
	ref: Model.SHARED_PHOTO,
	localField: '_id',
	foreignField: 'weddingId',
})

WeddingSchema.virtual('gifts', {
	ref: Model.GIFT,
	localField: '_id',
	foreignField: 'weddingId',
})

WeddingSchema.virtual('guestList', {
	ref: Model.GUEST,
	localField: '_id',
	foreignField: 'weddingId',
})

WeddingSchema.pre('save', async function(this: WeddingDoc, next): Promise<void> {
	// todo?
	next()
})

WeddingSchema.methods.guestVersion = function(this: WeddingDoc): GuestVersion {
	const wedding: WeddingDoc = this.toObject()

	delete wedding.stripeAccount

	return wedding
}

export const Wedding = mongoose.model<WeddingDoc>(Model.WEDDING, WeddingSchema)
export * from './types'
