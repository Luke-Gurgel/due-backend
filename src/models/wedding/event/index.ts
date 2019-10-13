import { Schema } from 'mongoose'
const { ObjectId } = Schema.Types

export const InstructionSchema: Schema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: String
})

export const EventSchema: Schema = new Schema({
  photos: {
    type: [Buffer],
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coords: {
      lat: {
        type: Number,
        required: true
      },
      long: {
        type: Number,
        required: true
      }
    },
    locationName: String
  },
  date: Date,
  instructions: [InstructionSchema]
})

export * from './types'
