import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { Wedding, Guest } from 'src/models/wedding'
import { clearDB } from '__tests__/__fixtures__/db'
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

test('should not return guest list if not authenticated', async () => {
	await request(app)
		.get(route)
		.expect(401)
})

test('should return with a 404 with user has not purchased a wedding', async () => {
	await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
		.expect(404)
})

test('should return an empty list if wedding.guestList is undefined', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userTwo.tokens[0].token)
		.expect(200)

	expect(res.body.guestList).toBeDefined()
	expect(res.body.guestList).toStrictEqual([])
})

test('should return wedding guest list', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	expect(res.body.guestList).toBeDefined()
	expect(res.body.guestList).toHaveLength(2)
	expect(res.body.guestList[0].name).toBe('Ibra')
	expect(res.body.guestList[1].name).toBe('Messi')
})
