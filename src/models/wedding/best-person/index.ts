import { Schema } from 'mongoose'
const { ObjectId } = Schema.Types

export const BestPersonSchema: Schema = new Schema({
  id: {
    type: ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['padrinho', 'madrinha', 'dama de honra', 'pajem']
  },
  photo: {
    type: Buffer,
    required: true
  }
})

export * from './types'
