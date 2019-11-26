import { Request, Response, NextFunction } from 'express'
import CoupleService from '../services/couple-service'
import { AuthenticatedWeddingAdminRequest, Couple } from 'src/types'

export default class CoupleController {
	public static async updateCouple(req: Request, res: Response, next: NextFunction): Promise<void> {
		const couple: Couple = req.body
		const { wedding } = req as AuthenticatedWeddingAdminRequest
		const couplePhotos = req.files as {
			groomPhoto?: Express.Multer.File[]
			bridePhoto?: Express.Multer.File[]
		}

		couple.bridePhoto = couplePhotos?.bridePhoto?.[0].buffer
		couple.groomPhoto = couplePhotos?.groomPhoto?.[0].buffer

		try {
			const updatedCouple = await CoupleService.updateCouple({ wedding, couple })
			res.status(200).send({ couple: updatedCouple })
		} catch (error) {
			next(error)
		}
	}
}
