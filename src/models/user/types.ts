import { Model, Document } from 'mongoose'
import { SharedMessageDoc } from '../wedding/shared-message'
import { SharedPhotoDoc } from '../wedding/shared-photo'
import { WeddingDoc } from '../wedding'

export interface Credentials {
	email: string
	password: string
}

export interface JwtToken {
	token: string
}

export interface PublicProfile {
	fname: string
	lname: string
	fullname: string
	email: string
	avatar?: Buffer
	wedding?: WeddingDoc
	sharedPhotos?: SharedPhotoDoc[]
	sharedMessages?: SharedMessageDoc[]
}

export interface UserModel extends PublicProfile {
	password: string
	tokens: JwtToken[]
}

export interface UserDoc extends UserModel, Document {
	[key: string]: any
}

export interface UserMethods extends Model<UserDoc> {
	toJSON: () => PublicProfile
	generateJwt: () => Promise<string>
	findByCredentials: (credentials: Credentials) => Promise<UserDoc>
}
