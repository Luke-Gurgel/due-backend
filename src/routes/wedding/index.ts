import { Router } from 'express'
import { createWedding } from './create'
import { getGuestVersion } from './guest-version'
import { purchaseEvent } from './purchase-event'
import { auth } from 'src/middlewares'

const weddingRouter = Router()

weddingRouter.route('/wedding/purchaseEvent').post(auth, purchaseEvent)

weddingRouter.route('/wedding/create').post(auth, createWedding)

weddingRouter.route('/wedding/guestAccess').get(auth, getGuestVersion)

export default weddingRouter
