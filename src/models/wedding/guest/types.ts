import { Document } from 'mongoose'

export interface GuestDoc extends Document {
  _id: string
  name: string
  email: string
  hasRSVP: boolean
  emailSent: boolean
}
