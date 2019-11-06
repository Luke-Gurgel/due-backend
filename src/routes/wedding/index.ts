import { Router } from 'express'
import { getGuestVersion } from './guest-version'
import { purchaseEvent } from './purchase-event'
import { changeEventName } from './event-name-change'
import { getGuestList } from './get-guest-list'
import { addGuest } from './add-guest'
import { deleteGuest } from './delete-guest'
import { updateGuest } from './update-guest'
import { updateCouple } from './update-couple'
import { auth, weddingAuth, couplePhotos } from 'src/middlewares'

const weddingRouter = Router()

weddingRouter.route('/wedding/purchaseEvent').post(auth, purchaseEvent)

weddingRouter.route('/wedding/guestAccess').get(auth, getGuestVersion)

weddingRouter.route('/wedding/eventName').post(auth, weddingAuth, changeEventName)

weddingRouter
	.route('/wedding/couple')
	.post(
		auth,
		weddingAuth,
		couplePhotos.fields([{ maxCount: 1, name: 'groomPhoto' }, { maxCount: 1, name: 'bridePhoto' }]),
		updateCouple,
	)

weddingRouter
	.route('/wedding/guests')
	.get(auth, weddingAuth, getGuestList)
	.post(auth, weddingAuth, addGuest)

weddingRouter
	.route('/wedding/guests/:guestId')
	.delete(auth, weddingAuth, deleteGuest)
	.patch(auth, weddingAuth, updateGuest)

export default weddingRouter
