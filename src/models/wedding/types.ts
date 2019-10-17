import { Document } from 'mongoose'
import { Couple } from './couple'
import { Event } from './event'
import { PreWeddingPhoto } from './pre-wedding-photo'
import { BestPeople } from './best-person'
import { SharedMessageDoc } from './shared-message'
import { SharedPhotoDoc } from './shared-photo'
import { GuestDoc } from './guest'

export enum DueEventStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface WeddingDoc extends Document {
  _id: string
  owner: string
  eventName: string
  status: DueEventStatus
  stripeAccount: string
  trailer: Buffer
  couple: Couple
  event: Event
  bestPeople: BestPeople
  preWeddingPhotos: PreWeddingPhoto[]
  sharedMessages: SharedMessageDoc[]
  sharedPhotos: SharedPhotoDoc[]
  guestList: GuestDoc[]
}

/*

  How guests will access events:

  1. Guest must know the event name and his/her email must be in the guest list. If there's a collision,
  we display a 2nd page with a list of the possible options. This page would only show photos of the bride and groom.

  - this option requires the couple to add every single person to the guest list, which is just not reasonable.

  2. We create a QR code that can be shared

  - how would this work on the users' phones? the QR code would have to be in some type of surface so that
  they can point their cameras at it. I don't want them to need to carry the invite around. Although if we can
  share the code with the guests and they add it to their apple/google wallets, we could read those and let them into
  the event.

  3. Events would need to have unique names

  - I'd like to allow people to name their events however they want. This would provide them a better exp. We
  should deal with the complexity instead of offloading it on the user

*/
