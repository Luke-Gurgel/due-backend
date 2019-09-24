import { Document } from 'mongoose'

export interface WeddingDoc extends Document {
  id: string
  owner: string
  eventCode: string
  status: string
  expDate: Date
}
