import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'
import { Guest } from 'src/models/wedding'

export const addGuest = async (req: EnhancedRequest, res: Response): Promise<Response | void> => {
	if (!req.user) {
		return res.status(401).send({ error: 'Not authenticated' })
	}

	if (!req.wedding) {
		return res.status(404).send({ error: 'User has not purchased an event' })
	}

	if (!req.body.guest || !req.body.guest.name) {
		return res.status(400).send({ error: 'Guest name is required' })
	}

	try {
		const newGuest = await new Guest({
			...req.body.guest,
			weddingId: req.wedding._id,
			emailSent: false,
			hasRSVP: false,
		})

		newGuest.save()
		res.status(200).send({ newGuest })
	} catch (error) {
		res.status(500).send({ error })
	}
}
