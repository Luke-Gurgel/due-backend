import { Schema, SchemaOptions } from 'mongoose'

const { ObjectId } = Schema.Types
const options: SchemaOptions = { timestamps: true }

export const PreWeddingPhotoSchema: Schema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  photo: {
    type: Buffer,
    required: true
  }
}, options)

export * from './types'
