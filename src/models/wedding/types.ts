import { Document } from 'mongoose'
import { Couple } from './couple'
import { Song } from './song'
import { Event } from './event'

export interface WeddingDoc extends Document {
  id: string
  owner: string
  eventCode: string
  status: string
  expDate: Date
  trailer: Buffer
  couple: Couple
  event: Event
  playlist: Song[]
}
