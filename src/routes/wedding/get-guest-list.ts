import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'

export const getGuestList = async (
	req: EnhancedRequest,
	res: Response,
): Promise<Response | void> => {
	if (!req.user) {
		return res.status(401).send({ error: 'Not authenticated' })
	}

	if (!req.wedding) {
		return res.status(401).send({ error: 'User has not purchased an event' })
	}

	try {
		await req.wedding.populate('guestList').execPopulate()
		res.status(200).send({ guestList: req.wedding.guestList || [] })
	} catch (error) {
		res.status(500).send({ error })
	}
}
