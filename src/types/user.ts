import { Model, Document } from 'mongoose'
import { SharedPhotoDoc } from './shared-photo'
import { SharedMessageDoc } from './shared-message'

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
}

export interface CreateUserDto {
	fname: string
	lname: string
	email: string
	password: string
}

export interface CreateUserPayload {
	user: UserModel
	token: string
}

export interface LoginUserDto {
	email: string
	password: string
}

export interface LoginUserPayload {
	user: UserModel
	token: string
}

export interface LogoutUserDto {
	user: UserDoc
	token: string
	allDevices?: boolean
}

export interface UserUpdateValidFields {
	fname?: string
	lname?: string
	email?: string
	password?: string
}

export interface UpdateUserDto {
	user: UserDoc
	fields: UserUpdateValidFields
	avatar?: Buffer | string
}

export interface UpdateUserPayload {
	user: UserModel
}
