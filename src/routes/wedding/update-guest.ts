import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'
import { Guest } from 'src/models/wedding'

export const updateGuest = async (
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

	const bodyFields = Object.keys(req.body)

	if (!bodyFields.length) {
		return res.status(400).send({ error: 'Specify at least one property to be updated' })
	}

	const validFields = ['name', 'email', 'hasRSVP', 'emailSent']
	const isValidOperation = bodyFields.every(field => validFields.includes(field))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid operation' })
	}

	try {
		const guest = await Guest.findByIdAndUpdate(req.params.guestId, req.body)

		if (!guest) {
			return res.status(404).send({ error: 'Guest does not exist' })
		}

		res.status(200).end()
	} catch (error) {
		res.status(500).send({ error })
	}
}
