import { Router } from 'express'
import { getGuestVersion } from './guest-version'
import { purchaseEvent } from './purchase-event'
import { changeEventName } from './event-name-change'
import { auth, weddingAuth } from 'src/middlewares'

const weddingRouter = Router()

weddingRouter.route('/wedding/purchaseEvent').post(auth, purchaseEvent)
weddingRouter.route('/wedding/guestAccess').get(auth, getGuestVersion)
weddingRouter.route('/wedding/eventName').post(auth, weddingAuth, changeEventName)

export default weddingRouter
