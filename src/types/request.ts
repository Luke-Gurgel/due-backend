import { Request } from 'express'
import { UserDoc } from 'src/models/user/types'
import { WeddingDoc } from 'src/models/wedding'

export interface AuthenticatedRequest extends Request {
	user: UserDoc
	token: string
}

export interface AuthenticatedWeddingRequest extends AuthenticatedRequest {
	wedding: WeddingDoc
}
