import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'
import { UserDoc } from 'src/models/user/types'
import Stripe from 'stripe'

const stripe = new Stripe('')

export const purchaseEvent = async (req: EnhancedRequest, res: Response): Promise<Response> => {
	if (!req.user || !req.user.email) {
		return res.status(404).send({ error: 'Not authenticated' })
	}

	if (!req.body.stripeToken) {
		return res.status(400).send({ error: 'Stripe token required' })
	}

	if (checkIfUserAlreadyPurchasedEvent(req.user)) {
		return res.status(400).send({ error: 'User has already purchased an event' })
	}

	try {
		const charge = await stripe.charges.create({
			amount: 2000,
			currency: 'brl',
			description: 'Evento Due',
			source: req.body.stripeToken,
			receipt_email: req.user.email,
		})
		return res.status(200).send({ charge })
	} catch (error) {
		return res.status(400).send({ error })
	}
}

export const checkIfUserAlreadyPurchasedEvent = async (user: UserDoc): Promise<boolean> => {
	const wedding = await user.populate('wedding').execPopulate()
	return wedding !== undefined || wedding !== null
}
