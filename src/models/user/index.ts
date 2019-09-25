/* eslint-disable @typescript-eslint/no-use-before-define */
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isEmail } from 'validator'
import { UserDoc, PublicProfile, Credentials } from './types'
import Model from '../models'

const UserSchema: Schema = new Schema({
  fname: {
    type: String,
    required: true,
    trim: true
  },
  lname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate (val: string): boolean {
      if (!isEmail(val)) {
        throw new Error('Invalid email entered')
      }
      return true
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, 'Password is too short'],
    validate (val: string): boolean {
      if (val.includes('password')) {
        throw new Error('Password cannot contain the word "password"')
      }
      return true
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  recentlyVisitedEvents: [{
    name: String
  }]
})

UserSchema.virtual('wedding', {
  ref: 'Wedding',
  localField: '_id',
  foreignField: 'owner'
})

UserSchema.virtual('sharedMessages', {
  ref: Model.SHARED_MESSAGE,
  localField: '_id',
  foreignField: 'authorId'
})

UserSchema.virtual('sharedPhotos', {
  ref: Model.SHARED_PHOTO,
  localField: '_id',
  foreignField: 'authorId'
})

UserSchema.virtual('fullname').get(function () {
  return this.fname + ' ' + this.lname
})

UserSchema.pre('save', async function(next): Promise<void> {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
})

UserSchema.methods.generateJwt = async function(): Promise<string> {
  const token = jwt.sign({ _id: this.id.toString() }, process.env.JWT_SECRET)
  this.tokens = [...this.tokens, { token }]
  await this.save()
  return token
}

UserSchema.methods.toJSON = function(): PublicProfile {
  const user = this.toObject()

  delete user.password
  delete user.tokens

  return user
}

UserSchema.statics.findByCredentials = async ({ email, password }: Credentials): Promise<UserDoc> => {
  const user = await User.findOne({ email })
  if (!user) throw Error('Unable to log in')

  const passwordsMatch = await bcrypt.compare(password, user.password)
  if (!passwordsMatch) throw Error('Unable to log in')

  return user
}

export const User = mongoose.model<UserDoc>(Model.USER, UserSchema)
