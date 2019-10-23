import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'
import { Wedding } from 'src/models/wedding'

export const createWedding = async (
	req: EnhancedRequest,
	res: Response,
): Promise<Response | void> => {
	if (!req.user) {
		return res.status(404).send({ error: 'Not authenticated' })
	}

	const wedding = new Wedding({ ownerId: req.user._id })

	try {
		await wedding.save()
		res.status(200).send({ wedding })
	} catch (error) {
		res.status(400).send({ error })
	}
}
