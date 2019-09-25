import { Document } from 'mongoose'
import { Couple } from './couple'
import { Event } from './event'
import { AlbumPhoto } from './album-photo'
import { BestPerson } from './best-person'
import { Song } from './song'
import { SharedMessageDoc } from './shared-message'
import { SharedPhotoDoc } from './shared-photo'
import { GuestDoc } from './guest'

export interface WeddingDoc extends Document {
  _id: string
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
  sharedMessages: SharedMessageDoc[]
  sharedPhotos: SharedPhotoDoc[]
  guestList: GuestDoc[]
}
