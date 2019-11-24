import request from 'supertest'
import User from 'src/models/user'
import Wedding from 'src/models/wedding'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { guestBody } from '__tests__/__fixtures__/guest'
import { weddingOne, weddingTwo } from '__tests__/__fixtures__/weddings'
import { userOne, userTwo, userThree } from '__tests__/__fixtures__/users'

beforeEach(async () => {
	await clearDB()
	await new User(userOne).save()
	await new User(userTwo).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
	await new Wedding(weddingTwo).save()
})

afterAll(clearDB)

const route = '/wedding/guests'
const authHeader = 'Authorization'

describe('Add new guest endpoint', () => {
	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.post(route)
			.expect(401)
	})

	test('rejects w/ 404 if user has not purchased a wedding', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
			.expect(404)
	})

	test('rejects w/ 400 if newGuest is not included in the request body', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({})
			.expect(400)

		expect(res.body.error).toBe('Missing newGuest from request body')
	})

	test('rejects w/ 400 if newGuest object is missing a name property', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ newGuest: { email: guestBody.email } })
			.expect(400)

		expect(res.body.error).toBe('New guest object must include a name property')
	})

	test("saves new guest in the DB under user's wedding", async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ newGuest: guestBody })
			.expect(200)

		expect(res.body.guest).toBeDefined()
		expect(res.body.guest.email).toBe(guestBody.email)
	})
})
