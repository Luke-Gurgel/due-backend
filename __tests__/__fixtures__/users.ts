import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

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
