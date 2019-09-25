import { Document } from 'mongoose'

export interface SharedPhotoDoc extends Document {
  _id: string
  weddingId: string
  authorId: string
  photo: Buffer
  caption: string
}
