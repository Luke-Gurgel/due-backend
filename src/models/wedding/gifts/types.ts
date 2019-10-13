import { Document } from 'mongoose'

export interface GiftDoc extends Document {
  _id: string
  weddingId: string
  giverName: string
  amount: number
}
