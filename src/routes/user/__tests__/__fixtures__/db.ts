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
  fname: 'Lucas',
  lname: 'Gurgel',
  email: 'lol123@example.com',
  password: 'IunnaIsFive',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET || '')
  }]
}

export const setupDB = async (): Promise<void> => {
  await new User(userOne).save()
}

export const clearDB = async (): Promise<void> => {
  await User.deleteMany(null)
}
