/* eslint-disable @typescript-eslint/no-use-before-define */
import mongoose, { Schema, SchemaOptions } from 'mongoose'
import Model from '../models'
import bcrypt from 'bcryptjs'
import { WeddingDoc } from './types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

const WeddingSchema: Schema = new Schema({
  id: {
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
  }
}, options)

WeddingSchema.virtual('sharedMessages', {
  ref: 'SharedMessage',
  localField: '_id',
  foreignField: 'weddingId'
})

WeddingSchema.virtual('sharedPhotos', {
  ref: 'SharedPhoto',
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

const WeddingModel = mongoose.model<WeddingDoc>(Model.WEDDING, WeddingSchema)
export default WeddingModel
