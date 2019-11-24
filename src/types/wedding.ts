import { Document } from 'mongoose'
import { Couple } from './couple'
import { Event } from './event'
import { PreWeddingPhoto } from './pre-wedding-photo'
import { BestPeople } from './best-people'
import { SharedMessageDoc } from './shared-message'
import { SharedPhotoDoc } from './shared-photo'
import { GuestDoc } from './guest'
import { UserDoc } from './user'
import { PurchaseInfo } from './payment'

export enum DueEventStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

export interface WeddingModel {
	_id: any
	ownerId: any
	status: DueEventStatus
	secret: string
	purchaseInfo: PurchaseInfo
	stripeAccount?: string
	qrCode?: Buffer
	trailer?: Buffer
	couple?: Couple
	event?: Event
	guestList?: GuestDoc[]
	bestPeople?: BestPeople
	preWeddingPhotos?: PreWeddingPhoto[]
	sharedMessages?: SharedMessageDoc[]
	sharedPhotos?: SharedPhotoDoc[]
}

export type GuestVersion = Omit<
	WeddingModel,
	'secret' | 'stripeAccount' | 'purchaseInfo' | 'guestList'
>
export type AdminVersion = Omit<WeddingModel, 'sharedMessages' | 'sharedPhotos'>

export interface WeddingDoc extends GuestVersion, AdminVersion, Document {
	guestVersion: () => GuestVersion
	adminVersion: () => AdminVersion
	generateJwt: () => Promise<void>
}

export interface GenericWeddingPayload {
	wedding: WeddingDoc
}

export interface PurchaseWeddingDto {
	user: UserDoc
	token: string
}
