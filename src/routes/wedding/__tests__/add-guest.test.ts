import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { Wedding } from 'src/models/wedding'
import { clearDB } from '__tests__/__fixtures__/db'
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

test('should not return guest list if not authenticated', async () => {
	await request(app)
		.post(route)
		.expect(401)
})

test('should return with a 404 with user has not purchased a wedding', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
		.expect(404)
})

test('should not add guest if no guest is included in the request body', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({})
		.expect(400)
})

test('should not add guest if name is not included in the request body', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ guest: guestBody.email })
		.expect(400)
})

test("should save a new guest in the DB under user's wedding", async () => {
	const res = await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ guest: guestBody })
		.expect(200)

	expect(res.body.newGuest).toBeDefined()
	expect(res.body.newGuest.email).toBe(guestBody.email)
})
