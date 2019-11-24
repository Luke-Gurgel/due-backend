import request from 'supertest'
import User from 'src/models/user'
import Guest from 'src/models/guest'
import Wedding from 'src/models/wedding'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { guestOne, guestTwo } from '__tests__/__fixtures__/guest'
import { weddingOne, weddingTwo } from '__tests__/__fixtures__/weddings'
import { userOne, userTwo, userThree } from '__tests__/__fixtures__/users'

beforeEach(async () => {
	await clearDB()
	await new User(userOne).save()
	await new User(userTwo).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
	await new Wedding(weddingTwo).save()
	await new Guest(guestOne).save()
	await new Guest(guestTwo).save()
})

afterAll(clearDB)

const route = '/wedding/guests'
const authHeader = 'Authorization'

describe('Get guest list endpoint', () => {
	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.get(route)
			.expect(401)
	})

	test('rejects w/ 404 with user has not purchased a wedding', async () => {
		await request(app)
			.get(route)
			.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
			.expect(404)
	})

	test('returns an empty list if wedding.guestList is undefined', async () => {
		const res = await request(app)
			.get(route)
			.set(authHeader, 'Bearer ' + userTwo.tokens[0].token)
			.expect(200)

		expect(res.body.guestList).toBeDefined()
		expect(res.body.guestList).toStrictEqual([])
	})

	test('returns wedding guest list', async () => {
		const res = await request(app)
			.get(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.expect(200)

		expect(res.body.guestList).toBeDefined()
		expect(res.body.guestList).toHaveLength(2)
		expect(res.body.guestList[0].name).toBe('Ibra')
		expect(res.body.guestList[1].name).toBe('Messi')
	})
})
