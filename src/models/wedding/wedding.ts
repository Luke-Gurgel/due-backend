/* eslint-disable @typescript-eslint/no-use-before-define */
import mongoose, { Schema, SchemaOptions } from 'mongoose'
import bcrypt from 'bcryptjs'
import { CoupleSchema } from './couple'
import { EventSchema } from './event'
import { AlbumPhotoSchema } from './album-photo'
import { BestPersonSchema } from './best-person'
import { SongSchema, Song } from './song'
import Model from '../models'
import { WeddingDoc } from './types'

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
  eventCode: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'expired'],
    default: 'inactive'
  },
  expDate: {
    type: Date,
    required: true
  },
  trailer: {
    type: Buffer,
    required: true
  },
  couple: CoupleSchema,
  event: EventSchema,
  bestPeople: [BestPersonSchema],
  albumPhotos: [AlbumPhotoSchema],
  playlist: {
    type: [SongSchema],
    validate(playlist: Song[]): boolean {
      return playlist.length < 10
    }
  }
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

WeddingSchema.virtual('guestList', {
  ref: Model.GUEST,
  localField: '_id',
  foreignField: 'weddingId'
})

WeddingSchema.pre('save', async function(next): Promise<void> {
  const wedding = this as WeddingDoc

  if (wedding.isModified('eventCode')) {
    wedding.eventCode = await bcrypt.hash(wedding.eventCode, 8)
  }

  if (wedding.isModified('status')) {
    const expDate = new Date()
    expDate.setMonth(expDate.getMonth() + 3)
    wedding.expDate = expDate
  }

  next()
})

export const WeddingModel = mongoose.model<WeddingDoc>(Model.WEDDING, WeddingSchema)
export * from './types'
