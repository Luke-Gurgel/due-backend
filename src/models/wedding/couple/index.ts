import { Schema } from 'mongoose'
import { Couple, NewlyWed } from './types'

export const NewlyWedSchema: Schema<NewlyWed> = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: Buffer,
    required: true
  }
})

export const CoupleSchema: Schema<Couple> = new Schema({
  shit: String,
  groom: NewlyWedSchema,
  bride: NewlyWedSchema,
  coupleStory: {
    type: String,
    required: true,
    trim: true
  }
})
