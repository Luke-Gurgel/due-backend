import { Document } from 'mongoose'
import { Couple } from './couple'
import { Song } from './song'

export interface WeddingDoc extends Document {
  id: string
  owner: string
  eventCode: string
  status: string
  expDate: Date
  trailer: Buffer
  couple: Couple
  playlist: Song[]
}
