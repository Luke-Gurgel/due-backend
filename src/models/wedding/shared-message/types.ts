import { Document } from 'mongoose'

export interface SharedMessageDoc extends Document {
  _id: string
  weddingId: string
  authorId: string
  message: string
}
