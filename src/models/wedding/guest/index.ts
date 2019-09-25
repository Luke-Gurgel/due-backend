import mongoose, { Schema } from 'mongoose'
import Model from '../../models'
import { GuestDoc } from './types'

const { ObjectId } = Schema.Types

export const GuestSchema: Schema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  weddingId: {
    type: ObjectId,
    required: true,
    ref: Model.WEDDING
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hasRSVP: {
    type: Boolean,
    required: true,
    default: false
  },
  emailSent: {
    type: Boolean,
    required: true,
    default: false
  }
})

export const GuestModel = mongoose.model<GuestDoc>(Model.GUEST, GuestSchema)
export * from './types'
