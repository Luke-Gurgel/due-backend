import { Schema } from 'mongoose'

export const NewlyWedSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: Buffer,
    required: true
  }
})

export const CoupleSchema: Schema = new Schema({
  groom: NewlyWedSchema,
  bride: NewlyWedSchema,
  coupleStory: {
    type: String,
    required: true,
    trim: true
  }
})

export * from './types'
