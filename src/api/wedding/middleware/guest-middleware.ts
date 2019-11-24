import { Request, Response, NextFunction } from 'express'

export default class GuestMiddleware {
	public static async addGuest(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		if (!req.body.newGuest) {
			return res.status(400).send({ error: 'Missing newGuest from request body' })
		} else if (!req.body.newGuest.name) {
			return res.status(400).send({ error: 'New guest object must include a name property' })
		}
		next()
	}

	public static async updateGuest(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		if (!req.params.guestId) {
			return res.status(400).send({ error: 'Missing guestId from request params' })
		}

		const bodyKeys = Object.keys(req.body)

		if (!bodyKeys.length) {
			return res.status(400).send({ error: 'Request body cannot be empty' })
		}

		const validFields = ['name', 'email', 'hasRSVP', 'emailSent']
		const isValidUpdate = bodyKeys.every(key => validFields.includes(key))

		if (!isValidUpdate) {
			return res.status(400).send({ error: 'Invalid update operation' })
		}

		next()
	}
}
