import { Request, Response, NextFunction } from 'express'
import CoupleService from '../services/couple-service'
import { AuthenticatedWeddingAdminRequest } from 'src/types'

export default class CoupleController {
	public static async updateCouple(req: Request, res: Response, next: NextFunction): Promise<void> {
		const couple = req.body
		const { wedding } = req as AuthenticatedWeddingAdminRequest
		const { groomPhoto, bridePhoto } = req.files as { groomPhoto?: any; bridePhoto?: any }

		try {
			const updatedCouple = await CoupleService.updateCouple({
				wedding,
				couple: { ...couple, groomPhoto, bridePhoto },
			})

			res.status(200).send({ couple: updatedCouple })
		} catch (error) {
			next(error)
		}
	}
}
