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
}

export interface UserDoc extends Document {
	_id: any
	fname: string
	lname: string
	fullname: string
	email: string
	password: string
	avatar?: Buffer
	tokens: JwtToken[]
	wedding: WeddingDoc
	sharedMessages: SharedMessageDoc[]
	sharedPhotos: SharedPhotoDoc[]
	generateJwt: () => Promise<string>
	toJSON: () => PublicProfile
	findByCredentials: (credentials: Credentials) => Promise<UserDoc>
	[key: string]: any
}

export interface UserInterface extends Model<UserDoc> {
	generateJwt: () => Promise<string>
	toJSON: () => PublicProfile
	findByCredentials: (credentials: Credentials) => Promise<UserDoc>
}
