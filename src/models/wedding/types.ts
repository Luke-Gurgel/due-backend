import { Document } from 'mongoose'
import { Couple } from './couple'
import { Event } from './event'
import { AlbumPhoto } from './album-photo'
import { BestPerson } from './best-person'
import { Song } from './song'

export interface WeddingDoc extends Document {
  id: string
  owner: string
  eventCode: string
  status: string
  expDate: Date
  trailer: Buffer
  couple: Couple
  event: Event
  albumPhotos: AlbumPhoto[]
  bestPeople: BestPerson[]
  playlist: Song[]
}
