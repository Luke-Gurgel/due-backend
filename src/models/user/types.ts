import { Document } from 'mongoose'

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

export interface UserDoc extends PublicProfile, Document {
  password: string;
  tokens: JwtToken[];
  generateJwt: () => Promise<string>
  toJSON: () => PublicProfile
  findByCredentials: (credentials: Credentials) => Promise<UserDoc>
}
