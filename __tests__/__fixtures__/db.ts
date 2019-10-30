import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from 'src/models/user'
import { Wedding, WeddingBase, DueEventStatus } from 'src/models/wedding'

export const userBody = {
	fname: 'Luke',
	lname: 'Gurgel',
	email: 'cali7lga@gmail.com',
	password: 'IunnaIs5YO',
}

export const userOneId = new mongoose.Types.ObjectId()
export const userOne = {
	_id: userOneId,
	fname: 'Pedro',
	lname: 'Alves',
	email: 'lol123@example.com',
	password: 'IunnaIsFive',
	tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET || '') }],
}

export const userTwoId = new mongoose.Types.ObjectId()
export const userTwo = {
	_id: userTwoId,
	fname: 'Heath',
	lname: 'Harmison',
	email: 'heath@example.com',
	password: 'IunnaIsFive',
	tokens: [
		{ token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET || '') },
		{ token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET || '') },
	],
}

export const userThreeId = new mongoose.Types.ObjectId()
export const userThree = {
	_id: userThreeId,
	fname: 'Leo',
	lname: 'Messi',
	email: 'messi@example.com',
	password: 'IunnaIsFive',
	tokens: [{ token: jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET || '') }],
}

export const weddingOneId = new mongoose.Types.ObjectId()
export const weddingOne: WeddingBase = {
	_id: weddingOneId,
	ownerId: userOne._id,
	status: DueEventStatus.INACTIVE,
}

export const weddingTwoId = new mongoose.Types.ObjectId()
export const weddingTwoEventName = 'where the light is'
export const weddingTwo: WeddingBase = {
	_id: weddingTwoId,
	ownerId: userTwo._id,
	status: DueEventStatus.ACTIVE,
	eventName: weddingTwoEventName,
}

export const weddingThreeId = new mongoose.Types.ObjectId()
export const weddingThree: WeddingBase = {
	_id: weddingThreeId,
	ownerId: userTwo._id,
	status: DueEventStatus.INACTIVE,
	eventName: weddingTwoEventName,
}

export const setupDB = async (): Promise<void> => {
	await Wedding.deleteMany(null)
	await User.deleteMany(null)
	await new User(userOne).save()
	await new User(userTwo).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
	await new Wedding(weddingTwo).save()
	await new Wedding(weddingThree).save()
}

export const clearDB = async (): Promise<void> => {
	await Wedding.deleteMany(null)
	await User.deleteMany(null)
}
