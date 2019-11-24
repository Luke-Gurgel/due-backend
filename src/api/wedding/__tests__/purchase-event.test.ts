import request from 'supertest'
import User from 'src/models/user'
import Wedding from 'src/models/wedding'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { weddingOne } from '__tests__/__fixtures__/weddings'
import { userOne, userThree, userThreeId } from '__tests__/__fixtures__/users'

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

describe('Wedding purchase endpoint', () => {
	test('saves new wedding to the DB if purchase is successful', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
			.send({ token: 'blablablabla' })
			.expect(201)

		expect(res.body.wedding).toBeDefined()
		const newWedding = await Wedding.findOne({ ownerId: userThreeId })
		expect(newWedding).toBeTruthy()
	})

	test('does not allow user that already has an event to purchase another one', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ token: 'blablablabla' })
			.expect(400)
	})

	test('rejects w/ 400 if payment token is not included in the request body', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.expect(400)
	})

	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.post(route)
			.expect(401)
	})
})
