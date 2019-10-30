import request from 'supertest'
import app from 'src/app'
import { clearDB } from '__tests__/__fixtures__/db'
import { userOne, userThree, userThreeId } from '__tests__/__fixtures__/users'
import { weddingOne } from '__tests__/__fixtures__/weddings'
import { Wedding } from 'src/models/wedding'
import User from 'src/models/user'

beforeAll(clearDB)

beforeEach(async () => {
	await new User(userOne).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
})

afterEach(clearDB)

jest.mock('stripe', () => {
	return jest.fn().mockImplementation(() => {
		return {
			charges: {
				create: (): string => 'mock response',
			},
		}
	})
})

const route = '/wedding/purchaseEvent'
const authHeader = 'Authorization'

test('should return a wedding object if purchase is successful', async () => {
	const res = await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
		.send({ stripeToken: 'blablablabla' })
		.expect(200)

	expect(res.body.wedding).toBeDefined()
})

test('should save a new wedding to the DB if purchase is successful', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
		.send({ stripeToken: 'blablablabla' })
		.expect(200)

	const newWedding = await Wedding.findOne({ ownerId: userThreeId })
	expect(newWedding).toBeTruthy()
})

test('should not allow user that already has an event to purchase another one', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ stripeToken: 'blablablabla' })
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
