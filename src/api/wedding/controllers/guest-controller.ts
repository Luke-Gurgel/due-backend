import { Request, Response, NextFunction } from 'express'
import GuestService from '../services/guest-service'
import { AuthenticatedWeddingAdminRequest } from 'src/types'

export default class GuestController {
	public static async getGuestList(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { wedding } = req as AuthenticatedWeddingAdminRequest

		try {
			const guestList = await GuestService.getGuestList(wedding)
			res.status(200).send({ guestList })
		} catch (error) {
			next(error)
		}
	}

	public static async addGuest(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { wedding } = req as AuthenticatedWeddingAdminRequest
		const { newGuest } = req.body

		try {
			const guest = await GuestService.addGuest({ wedding, newGuest })
			res.status(200).send({ guest })
		} catch (error) {
			next(error)
		}
	}

	public static async updateGuest(req: Request, res: Response, next: NextFunction): Promise<void> {
		const fields = req.body
		const { guestId } = req.params

		try {
			const guest = await GuestService.updateGuest({ guestId, fields })
			res.status(200).send({ guest })
		} catch (error) {
			next(error)
		}
	}

	public static async deleteGuest(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { guestId } = req.params

		try {
			await GuestService.deleteGuest({ guestId })
			res.status(200).end()
		} catch (error) {
			next(error)
		}
	}
}
