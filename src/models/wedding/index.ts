/* eslint-disable @typescript-eslint/no-use-before-define */
import mongoose, { Schema, SchemaOptions } from 'mongoose'
import jwt from 'jsonwebtoken'
import { EventSchema } from '../event'
import { CoupleSchema } from '../couple'
import { BestPeopleSchema } from '../best-people'
import { PreWeddingPhotoSchema } from '../pre-wedding-photo'
import { WeddingDoc, DueEventStatus, GuestVersion, AdminVersion, Model } from 'src/types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

export const WeddingSchema: Schema = new Schema(
	{
		ownerId: {
			type: ObjectId,
			required: true,
			ref: Model.USER,
			unique: true,
		},
		status: {
			type: String,
			default: DueEventStatus.INACTIVE,
			enum: [DueEventStatus.ACTIVE, DueEventStatus.INACTIVE],
		},
		secret: {
			type: String,
		},
		purchaseInfo: {
			required: true,
			type: Object,
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

WeddingSchema.methods.generateJwt = async function(this: WeddingDoc): Promise<void> {
	if (process.env.JWT_SECRET !== undefined) {
		const token = jwt.sign({ _id: this.id.toString() }, process.env.JWT_SECRET)
		this.secret = token
		await this.save()
	}
}

WeddingSchema.methods.guestVersion = function(this: WeddingDoc): GuestVersion {
	const wedding: WeddingDoc = this.toObject()

	delete wedding.secret
	delete wedding.stripeAccount
	delete wedding.purchaseInfo
	delete wedding.guestList

	return wedding
}

WeddingSchema.methods.adminVersion = function(this: WeddingDoc): AdminVersion {
	const wedding: WeddingDoc = this.toObject()

	delete wedding.sharedMessages
	delete wedding.sharedPhotos

	return wedding
}

const Wedding = mongoose.model<WeddingDoc>(Model.WEDDING, WeddingSchema)
export default Wedding
