import mongoose from 'mongoose'
import { weddingOneId, weddingTwoId } from './weddings'
import { GuestModel } from 'src/types'

export const guestOneId = new mongoose.Types.ObjectId()
export const guestOne: GuestModel = {
	_id: guestOneId,
	weddingId: weddingOneId,
	name: 'Ibra',
	email: 'ibra@mail.com',
	hasRSVP: false,
	emailSent: false,
}

export const guestTwoId = new mongoose.Types.ObjectId()
export const guestTwo: GuestModel = {
	_id: guestTwoId,
	weddingId: weddingOneId,
	name: 'Messi',
	email: 'messi@mail.com',
	hasRSVP: false,
	emailSent: false,
}

export const guestThreeId = new mongoose.Types.ObjectId()
export const guestThree: GuestModel = {
	_id: guestThreeId,
	weddingId: weddingTwoId,
	name: 'CR7',
	email: 'cr7@mail.com',
	hasRSVP: false,
	emailSent: false,
}

export const guestFourId = new mongoose.Types.ObjectId()
export const guestFour: GuestModel = {
	_id: guestFourId,
	weddingId: weddingTwoId,
	name: 'Dybala',
	email: 'dybala@mail.com',
	hasRSVP: false,
	emailSent: false,
}

export const guestBody = {
	name: 'Dybala',
	email: 'dybala@mail.com',
}
