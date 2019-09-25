import { Document } from 'mongoose'
import { SharedMessageDoc } from '../wedding/shared-message'
import { SharedPhotoDoc } from '../wedding/shared-photo'

export interface Credentials {
  email: string;
  password: string;
}

export interface JwtToken {
  token: string
}

export interface PublicProfile {
  name: string;
  email: string;
  avatar?: Buffer;
}

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: Buffer;
  tokens: JwtToken[];
  sharedMessages: SharedMessageDoc[]
  sharedPhotos: SharedPhotoDoc[]
  generateJwt: () => Promise<string>
  toJSON: () => PublicProfile
  findByCredentials: (credentials: Credentials) => Promise<UserDoc>
}
