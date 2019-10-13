/* eslint-disable @typescript-eslint/no-use-before-define */
import mongoose, { Schema, SchemaOptions } from 'mongoose'
import bcrypt from 'bcryptjs'
import { CoupleSchema } from './couple'
import { EventSchema } from './event'
import { PreWeddingPhotoSchema } from './pre-wedding-photo'
import { BestPeopleSchema } from './best-person'
import Model from '../models'
import { WeddingDoc, DueEventStatus } from './types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

const WeddingSchema: Schema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  qr: {
    type: Buffer,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: [DueEventStatus.ACTIVE, DueEventStatus.INACTIVE],
    default: DueEventStatus.INACTIVE
  },
  stripeAccount: {
    type: String,
    required: true
  },
  trailer: {
    type: Buffer,
    required: true
  },
  couple: CoupleSchema,
  event: EventSchema,
  bestPeople: BestPeopleSchema,
  preWeddingPhotos: [PreWeddingPhotoSchema]
  // admin (people allowed to manage the event)
}, options)

WeddingSchema.virtual('sharedMessages', {
  ref: Model.SHARED_MESSAGE,
  localField: '_id',
  foreignField: 'weddingId'
})

WeddingSchema.virtual('sharedPhotos', {
  ref: Model.SHARED_PHOTO,
  localField: '_id',
  foreignField: 'weddingId'
})

WeddingSchema.virtual('gifts', {
  ref: Model.GIFT,
  localField: '_id',
  foreignField: 'weddingId'
})

WeddingSchema.virtual('guestList', {
  ref: Model.GUEST,
  localField: '_id',
  foreignField: 'weddingId'
})

WeddingSchema.pre('save', async function(next): Promise<void> {
  const wedding = this as WeddingDoc

  if (wedding.isModified('stripeAccount')) {
    this.stripeAccount = await bcrypt.hash(this.stripeAccount, 8)
  }

  next()
})

export const WeddingModel = mongoose.model<WeddingDoc>(Model.WEDDING, WeddingSchema)
export * from './types'
