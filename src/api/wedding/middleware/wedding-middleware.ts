import { Request, Response, NextFunction } from 'express'
import WeddingDAL from '../data-access/wedding-dal'
import { EnhancedRequest } from 'src/types'

export default class WeddingMiddleware {
	public static async adminAuth(
		req: EnhancedRequest,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		try {
			const wedding = await WeddingDAL.findByOwner(req.user?.id)

			if (!wedding) {
				return res.status(404).send({ error: 'User has not purchased an event.' })
			}

			req.wedding = wedding
			next()
		} catch (error) {
			res.status(500).send({ error })
		}
	}

	public static async purchaseWedding(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		if (!req.body.token) {
			return res.status(400).send({ error: 'Payment token missing from request body' })
		}
		next()
	}

	public static async guestAccess(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		if (!req.body.weddingSecret) {
			return res.status(400).send({ error: 'Wedding secret missing from request body' })
		}
		next()
	}
}
