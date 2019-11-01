import { Document } from 'mongoose'

export interface GiftModel {
	_id: any
	weddingId: any
	giverName: string
	amount: number
}

export interface GiftDoc extends GiftModel, Document {}
