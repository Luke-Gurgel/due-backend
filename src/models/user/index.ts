import mongoose, { Schema, SchemaOptions, HookNextFunction } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isEmail } from 'validator'
import { UserInterface, UserDoc, PublicProfile, Credentials } from './types'
import Model from '../models'

const options: SchemaOptions = { timestamps: true }

const UserSchema: Schema = new Schema(
	{
		fname: {
			type: String,
			required: true,
			trim: true,
		},
		lname: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			validate(val: string): boolean {
				if (!isEmail(val)) {
					throw Error('Invalid email entered')
				}
				return true
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: [8, 'Password is too short'],
			validate(val: string): boolean {
				if (val.includes('password')) {
					throw Error('Password cannot contain the word "password"')
				}
				return true
			},
		},
		avatar: Buffer,
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		recentlyVisitedEvents: [
			{
				name: String,
			},
		],
	},
	options,
)

UserSchema.virtual('wedding', {
	ref: Model.WEDDING,
	localField: '_id',
	foreignField: 'ownerId',
	justOne: true,
})

UserSchema.virtual('sharedMessages', {
	ref: Model.SHARED_MESSAGE,
	localField: '_id',
	foreignField: 'authorId',
})

UserSchema.virtual('sharedPhotos', {
	ref: Model.SHARED_PHOTO,
	localField: '_id',
	foreignField: 'authorId',
})

UserSchema.virtual('fullname').get(function(this: UserDoc) {
	return this.fname + ' ' + this.lname
})

UserSchema.pre('save', async function(this: UserDoc, next: HookNextFunction): Promise<void> {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8)
	}

	next()
})

UserSchema.methods.generateJwt = async function(this: UserDoc): Promise<string | undefined> {
	if (process.env.JWT_SECRET !== undefined) {
		const token = jwt.sign({ _id: this.id.toString() }, process.env.JWT_SECRET)
		this.tokens = [...this.tokens, { token }]
		await this.save()
		return token
	}
	throw Error('could not generate token. process.env.JWT_SECRET is undefined')
}

UserSchema.methods.toJSON = function(this: UserDoc): PublicProfile {
	const user = this.toObject()

	delete user.password
	delete user.tokens

	return user
}

UserSchema.statics.findByCredentials = async ({
	email,
	password,
}: Credentials): Promise<UserDoc> => {
	const user = await User.findOne({ email })
	if (!user) throw Error('Unable to log in')

	const passwordsMatch = await bcrypt.compare(password, user.password)
	if (!passwordsMatch) throw Error('Unable to log in')

	return user
}

const User = mongoose.model<UserDoc, UserInterface>(Model.USER, UserSchema)
export default User
