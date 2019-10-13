import mongoose, { Schema, SchemaOptions } from 'mongoose'
import Model from '../../models'
import { GiftDoc } from './types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

export const GiftSchema: Schema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  weddingId: {
    type: ObjectId,
    required: true,
    ref: Model.WEDDING
  },
  giverName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, options)

export const GiftModel = mongoose.model<GiftDoc>(Model.SHARED_MESSAGE, GiftSchema)
export * from './types'
