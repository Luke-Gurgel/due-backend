import { Router } from 'express'
import { getGuestVersion } from './guest-version'
import { purchaseEvent } from './purchase-event'
import { changeEventName } from './event-name-change'
import { getGuestList } from './get-guest-list'
import { addGuest } from './add-guest'
import { auth, weddingAuth } from 'src/middlewares'

const weddingRouter = Router()

weddingRouter.route('/wedding/purchaseEvent').post(auth, purchaseEvent)

weddingRouter.route('/wedding/guestAccess').get(auth, getGuestVersion)

weddingRouter.route('/wedding/eventName').post(auth, weddingAuth, changeEventName)

weddingRouter
	.route('/wedding/guests')
	.get(auth, weddingAuth, getGuestList)
	.post(auth, weddingAuth, addGuest)

export default weddingRouter
