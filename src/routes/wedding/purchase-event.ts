import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'
import { UserDoc } from 'src/models/user/types'
import { Wedding } from 'src/models/wedding'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SK_KEY || '')

const cardErrorMessage =
	'Seu cartão foi rejeitado. Por favor, verifique que todas as informações estão corretas e que o car†ão é válido.'
const unknownErrorMessage =
	'Algo inesperado aconteceu. Estamos trabalhando para consertar este problema. Por favor, tente novamente mais tarde.'

export const purchaseEvent = async (
	req: EnhancedRequest,
	res: Response,
): Promise<Response | void> => {
	if (!req.user || !req.user.email) {
		return res.status(404).send({ error: 'Not authenticated' })
	}

	if (!req.body.stripeToken) {
		return res.status(400).send({ error: 'Stripe token required' })
	}

	const userAlreadyPurchasedEvent = await checkIfUserAlreadyPurchasedEvent(req.user)

	if (userAlreadyPurchasedEvent) {
		return res.status(400).send({ error: 'User has already purchased an event' })
	}

	try {
		await stripe.charges.create({
			amount: 2000,
			currency: 'brl',
			description: 'Evento Due',
			source: req.body.stripeToken,
			receipt_email: req.user.email,
		})

		const wedding = new Wedding({ ownerId: req.user._id })
		await wedding.save()

		res.status(200).send({ wedding })
	} catch (error) {
		switch (error.type) {
			case 'card_error':
				return res.status(400).send({ error: cardErrorMessage })
			default:
				return res.status(500).send({ error: unknownErrorMessage })
		}
	}
}

export const checkIfUserAlreadyPurchasedEvent = async (user: UserDoc): Promise<boolean> => {
	await user.populate('wedding').execPopulate()
	return user.wedding !== null
}
