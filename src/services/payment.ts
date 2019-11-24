import Stripe from 'stripe'
import { PurchaseInfo } from 'src/types'

export default class PaymentService {
	private static paymentProcessor = new Stripe(process.env.PAYMENT_PROCESSING_KEY || '')

	public static async purchaseWedding(
		token: string,
		emailForReceipt: string,
	): Promise<PurchaseInfo> {
		return await this.paymentProcessor.charges.create({
			amount: 2000,
			source: token,
			currency: 'brl',
			description: 'Evento Due',
			receipt_email: emailForReceipt,
		})
	}
}
