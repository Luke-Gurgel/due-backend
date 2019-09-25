import mongoose, { Schema, SchemaOptions } from 'mongoose'
import Model from '../../models'
import { SharedMessageDoc } from './types'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

export const SharedMessageSchema: Schema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  weddingId: {
    type: ObjectId,
    required: true,
    ref: Model.WEDDING
  },
  authorId: {
    type: ObjectId,
    required: true,
    ref: Model.USER
  },
  message: {
    type: String,
    required: true
  }
}, options)

export const SharedMessageModel = mongoose.model<SharedMessageDoc>(Model.SHARED_MESSAGE, SharedMessageSchema)
export * from './types'
