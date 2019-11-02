import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'
import { Guest } from 'src/models/wedding'

export const deleteGuest = async (
	req: EnhancedRequest,
	res: Response,
): Promise<Response | void> => {
	if (!req.user) {
		return res.status(401).send({ error: 'Not authenticated' })
	}

	if (!req.wedding) {
		return res.status(404).send({ error: 'User has not purchased an event' })
	}

	if (!req.params.guestId) {
		return res.status(400).send({ error: 'Guest id is required for deletion' })
	}

	try {
		const unwantedGuest = await Guest.findByIdAndDelete(req.params.guestId)

		if (!unwantedGuest) {
			return res.status(404).send({ error: 'Guest does not exist' })
		}

		res.status(200).end()
	} catch (error) {
		res.status(500).send({ error })
	}
}
