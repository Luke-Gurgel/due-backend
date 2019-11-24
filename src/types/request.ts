import { Request } from 'express'
import { UserDoc } from './user'
import { WeddingDoc } from './wedding'

export interface AuthenticatedRequest extends Request {
	user: UserDoc
	token: string
}

export interface AuthenticatedWeddingAdminRequest extends AuthenticatedRequest {
	wedding: WeddingDoc
}

export interface EnhancedRequest extends Request {
	user?: UserDoc
	wedding?: WeddingDoc
	token?: string
}
