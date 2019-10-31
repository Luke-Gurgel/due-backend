import { Response, NextFunction } from 'express'
import { EnhancedRequest } from './auth'
import { Wedding } from 'src/models/wedding'

export const weddingAuth = async (
	req: EnhancedRequest,
	res: Response,
	next: NextFunction,
): Promise<Response | void> => {
	if (!req.user) {
		return res.status(401).send({ error: 'Not authenticated.' })
	}

	try {
		const wedding = await Wedding.findOne({ ownerId: req.user._id })

		if (!wedding) {
			return res.status(404).send({ error: 'User has not purchased an event.' })
		}

		req.wedding = wedding
		next()
	} catch (error) {
		res.status(500).send({ error })
	}
}
