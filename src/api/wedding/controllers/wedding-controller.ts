import { Request, Response, NextFunction } from 'express'
import WeddingService from '../services/wedding-service'
import {
	PurchaseWeddingDto,
	AuthenticatedRequest,
	AuthenticatedWeddingAdminRequest,
} from 'src/types'

export default class WeddingController {
	public static async purchaseWedding(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		const { user } = req as AuthenticatedRequest
		const purchaseWeddingDto: PurchaseWeddingDto = { user, token: req.body.token }

		try {
			const { wedding } = await WeddingService.purchaseWedding(purchaseWeddingDto)
			res.status(201).send({ wedding })
		} catch (error) {
			next(error)
		}
	}

	public static async guestAccess(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		const { weddingSecret } = req.body

		try {
			const wedding = await WeddingService.guestAccess(weddingSecret)

			if (!wedding) {
				throw Error('No wedding was found:404')
			}

			res.status(200).send({ wedding })
		} catch (error) {
			next(error)
		}
	}

	public static async adminAccess(req: Request, res: Response): Promise<Response | void> {
		const { wedding } = req as AuthenticatedWeddingAdminRequest
		res.status(200).send({ wedding: wedding.adminVersion() })
	}
}
