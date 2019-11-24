import mongoose from 'mongoose'
import { WeddingModel, DueEventStatus } from 'src/types'
import { userOneId, userTwoId } from './users'
import { chargeOne } from './charge'

export const weddingOneId = new mongoose.Types.ObjectId()
export const weddingOne: WeddingModel = {
	_id: weddingOneId,
	ownerId: userOneId,
	status: DueEventStatus.INACTIVE,
	secret: 'dhaus_dsdais-dan97da87d',
	purchaseInfo: chargeOne,
}

export const weddingTwoId = new mongoose.Types.ObjectId()
export const weddingTwo: WeddingModel = {
	_id: weddingTwoId,
	ownerId: userTwoId,
	status: DueEventStatus.ACTIVE,
	secret: 'dhasui78dasjdas89',
	purchaseInfo: chargeOne,
}

export const weddingThreeId = new mongoose.Types.ObjectId()
export const weddingThree: WeddingModel = {
	_id: weddingThreeId,
	ownerId: userTwoId,
	status: DueEventStatus.INACTIVE,
	secret: 'hda9sd3h89dashda0',
	purchaseInfo: chargeOne,
}
