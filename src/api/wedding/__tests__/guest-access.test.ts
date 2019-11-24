import request from 'supertest'
import User from 'src/models/user'
import Wedding from 'src/models/wedding'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { userOne, userTwo } from '__tests__/__fixtures__/users'
import { weddingOne, weddingTwo } from '__tests__/__fixtures__/weddings'

beforeAll(clearDB)

beforeEach(async () => {
	await new User(userOne).save()
	await new User(userTwo).save()
	await new Wedding(weddingOne).save()
	await new Wedding(weddingTwo).save()
})

afterEach(clearDB)

const route = '/wedding/guestAccess'
const authHeader = 'Authorization'

describe('Wedding guest access endpoint', () => {
	test('Does not return wedding event if inactive', async () => {
		const res = await request(app)
			.get(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ weddingSecret: weddingOne.secret })
			.expect(400)

		expect(res.body.error).toBe('Event is not active yet')
		expect(res.body.wedding).toBeUndefined()
	})

	test('rejects w/ 404 if the secret does not belong to any wedding', async () => {
		const res = await request(app)
			.get(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ weddingSecret: 'blahblah' })
			.expect(404)

		expect(res.body.error).toBe('No wedding was found')
		expect(res.body.wedding).toBeUndefined()
	})

	test('rejects w/ 400 if wedding secret is not included in the request body', async () => {
		const res = await request(app)
			.get(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.expect(400)

		expect(res.body.error).toBe('Wedding secret missing from request body')
	})

	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.get(route)
			.expect(401)
	})
})
