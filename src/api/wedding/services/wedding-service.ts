import Wedding from 'src/models/wedding'
import WeddingDAL from '../data-access/wedding-dal'
import Publisher from 'src/pub-sub/publisher'
import PaymentService from 'src/services/payment'
import { GuestVersion, GenericWeddingPayload, PurchaseWeddingDto, DueEventStatus } from 'src/types'

export default class WeddingService extends Publisher {
	public static async purchaseWedding({
		user,
		token,
	}: PurchaseWeddingDto): Promise<GenericWeddingPayload> {
		const purchasedWedding = await WeddingDAL.findByOwner(user.id)
		const userAlreadyPurchasedWedding = purchasedWedding !== null

		if (userAlreadyPurchasedWedding) {
			throw Error('User has already purchased an event:400')
		}

		const purchaseInfo = await PaymentService.purchaseWedding(token, user.email)
		const wedding = new Wedding({ ownerId: user.id, purchaseInfo })
		await wedding.generateJwt()
		await wedding.save()

		return { wedding }
	}

	public static async guestAccess(weddingSecret: string): Promise<GuestVersion | undefined> {
		const wedding = await Wedding.findOne({ secret: weddingSecret })

		if (wedding?.status === DueEventStatus.INACTIVE) {
			throw Error('Event is not active yet:400')
		}

		return wedding?.guestVersion()
	}
}
