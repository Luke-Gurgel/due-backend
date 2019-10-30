import mongoose from 'mongoose'
import { WeddingBase, DueEventStatus } from 'src/models/wedding'
import { userOneId, userTwoId } from './users'

export const weddingOneId = new mongoose.Types.ObjectId()
export const weddingOne: WeddingBase = {
	_id: weddingOneId,
	ownerId: userOneId,
	status: DueEventStatus.INACTIVE,
}

export const weddingTwoId = new mongoose.Types.ObjectId()
export const weddingTwoEventName = 'where the light is'
export const weddingTwo: WeddingBase = {
	_id: weddingTwoId,
	ownerId: userTwoId,
	status: DueEventStatus.ACTIVE,
	eventName: weddingTwoEventName,
}

export const weddingThreeId = new mongoose.Types.ObjectId()
export const weddingThree: WeddingBase = {
	_id: weddingThreeId,
	ownerId: userTwoId,
	status: DueEventStatus.INACTIVE,
	eventName: weddingTwoEventName,
}
