import { Document, Types } from 'mongoose'
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

export interface WeddingBase {
	_id: any
	ownerId: any
	status: DueEventStatus
	eventName?: string
	qrCode?: Buffer
	trailer?: Buffer
	couple?: Couple
	event?: Event
	bestPeople?: BestPeople
	preWeddingPhotos?: PreWeddingPhoto[]
}

export interface GuestAccessVersion extends WeddingBase {
	sharedMessages?: SharedMessageDoc[]
	sharedPhotos?: SharedPhotoDoc[]
}

export interface PortalVersion extends WeddingBase {
	stripeAccount?: string
	guestList?: GuestDoc[]
}

export interface WeddingDoc extends GuestAccessVersion, PortalVersion, Document {}
