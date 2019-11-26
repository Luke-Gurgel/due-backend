import { Request, Response, NextFunction } from 'express'
import EventService from '../services/event-service'
import { AuthenticatedWeddingAdminRequest, Event } from 'src/types'

export default class EventController {
	public static async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { wedding } = req as AuthenticatedWeddingAdminRequest
		const event: Event = req.body

		if (req.files) {
			const files = req.files as Express.Multer.File[]
			const photos: Buffer[] = files.map(file => file.buffer)
			event.photos = photos
		}

		try {
			const updatedEvent = await EventService.updateEvent({ wedding, event })
			res.status(200).send({ event: updatedEvent })
		} catch (error) {
			next(error)
		}
	}
}
