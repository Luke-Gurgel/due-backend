import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'
import { Wedding, WeddingDoc, GuestVersion, DueEventStatus } from 'src/models/wedding'

export const getGuestVersion = async (
	req: EnhancedRequest,
	res: Response,
): Promise<Response | void> => {
	if (!req.user) {
		return res.status(404).send({ error: 'Not authenticated' })
	}

	if (req.query.eventName) {
		const weddings = await Wedding.find({ eventName: req.query.eventName })
		const activeEvents = filterActiveEvents(weddings)
		return res.status(200).send({ weddings: activeEvents })
	}

	res.status(400).send({ error: 'Either event name or QR code is required' })
}

export const filterActiveEvents = (weddings: WeddingDoc[]): GuestVersion[] => {
	return weddings.reduce((weddings: GuestVersion[], wedding) => {
		if (wedding.status === DueEventStatus.ACTIVE) {
			const guestVersion: GuestVersion = wedding.guestVersion()
			weddings.push(guestVersion)
		}

		return weddings
	}, [])
}
