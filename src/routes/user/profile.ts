import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'

export const getUserProfile = async (
	req: EnhancedRequest,
	res: Response,
): Promise<Response | void> => {
	if (!req.user) {
		return res.status(401).send({ error: 'Not authenticated' })
	}

	try {
		await req.user.populate('wedding').execPopulate()
		res.status(200).send({ user: req.user })
	} catch (error) {
		res.status(400).send({ error })
	}
}
