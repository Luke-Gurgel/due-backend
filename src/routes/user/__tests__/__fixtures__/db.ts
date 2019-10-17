import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from 'src/models/user'

export const userBody = {
  fname: 'Luke',
  lname: 'Gurgel',
  email: 'cali7lga@gmail.com',
  password: 'IunnaIs5YO'
}

export const userOneId = new mongoose.Types.ObjectId()
export const userOne = {
  _id: userOneId,
  fname: 'Pedro',
  lname: 'Alves',
  email: 'lol123@example.com',
  password: 'IunnaIsFive',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET || '')
  }]
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
  ]
}

export const setupDB = async (): Promise<void> => {
  await User.deleteMany(null)
  await new User(userOne).save()
  await new User(userTwo).save()
}

export const clearDB = async (): Promise<void> => {
  await User.deleteMany(null)
}
