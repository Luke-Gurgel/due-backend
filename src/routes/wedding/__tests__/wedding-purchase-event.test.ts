import request from 'supertest'
import app from 'src/app'
import { clearDB, setupDB, userOne } from '__tests__/__fixtures__/db'
import Stripe from 'stripe'

const stripe = new Stripe('')

beforeEach(setupDB)
afterEach(clearDB)

const route = '/wedding/purchaseEvent'
const authHeader = 'Authorization'

test('should return a charge object if purchase is successful', async () => {
	// const stripeToken = ?
	// const res = await request(app)
	// 	.post(route)
	// 	.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
	// 	.send({})
})

test('should not allow user that already has an event to purchase another one', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(400)
})

test('should return 400 if stripe token is not included in the request', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(400)
})

test('should not allow user to purchase event if not authenticated', async () => {
	await request(app)
		.post(route)
		.expect(401)
})
