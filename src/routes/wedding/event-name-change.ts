import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'
import { DueEventStatus } from 'src/models/wedding'

export const changeEventName = async (
	req: EnhancedRequest,
	res: Response,
): Promise<Response | void> => {
	if (!req.wedding) {
		return res.status(404).send({ error: 'User has not purchased an event' })
	}

	if (!req.body.eventName) {
		return res.status(400).send({ error: 'An event name is required' })
	}

	if (req.wedding.status === DueEventStatus.ACTIVE) {
		return res.status(403).send({ error: 'The event name cannot be changed after activation.' })
	}

	req.wedding.eventName = req.body.eventName

	try {
		req.wedding.save()
		res.status(200).end()
	} catch (error) {
		res.status(500).send({ error })
	}
}
