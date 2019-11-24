import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'

import WeddingMiddleware from '../middleware/wedding-middleware'
import GuestMiddleware from '../middleware/guest-middleware'
import authMiddleware from '../../shared/auth-middleware'

import WeddingController from '../controllers/wedding-controller'
import GuestController from '../controllers/guest-controller'

import WeddingErrorHandler from '../error-handlers/wedding-error-handler'

const weddingRouter = Router()

weddingRouter
	.route('/wedding/purchaseEvent')
	.post(authMiddleware, WeddingMiddleware.purchaseWedding, WeddingController.purchaseWedding)

weddingRouter
	.route('/wedding/guestAccess')
	.get(authMiddleware, WeddingMiddleware.guestAccess, WeddingController.guestAccess)

weddingRouter
	.route('/wedding/adminAccess')
	.get(authMiddleware, WeddingMiddleware.adminAuth, WeddingController.adminAccess)

weddingRouter
	.route('/wedding/guests')
	.all(authMiddleware, WeddingMiddleware.adminAuth)
	.get(GuestController.getGuestList)
	.post(GuestMiddleware.addGuest, GuestController.addGuest)

weddingRouter
	.route('/wedding/guests/:guestId')
	.all(authMiddleware, WeddingMiddleware.adminAuth)
	.patch(GuestMiddleware.updateGuest, GuestController.updateGuest)
	.delete(GuestController.deleteGuest)

// weddingRouter
// 	.route('/wedding/couple')
// 	.post(
// 		auth,
// 		weddingAuth,
// 		couplePhotos.fields([{ maxCount: 1, name: 'groomPhoto' }, { maxCount: 1, name: 'bridePhoto' }]),
// 		updateCouple,
// 	)

weddingRouter.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	return new WeddingErrorHandler(error, res)
})

export default weddingRouter
