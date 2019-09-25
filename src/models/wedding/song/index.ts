import { Schema } from 'mongoose'

export const SongSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  track: {
    type: Buffer,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
})

export * from './types'
