import request from 'supertest'
import User from 'src/models/user'
import Guest from 'src/models/guest'
import Wedding from 'src/models/wedding'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { weddingOne } from '__tests__/__fixtures__/weddings'
import { userOne, userThree } from '__tests__/__fixtures__/users'
import { guestOne, guestOneId, guestTwoId } from '__tests__/__fixtures__/guest'

beforeEach(async () => {
	await clearDB()
	await new User(userOne).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
	await new Guest(guestOne).save()
})

afterAll(clearDB)

const route = '/wedding/guests'
const authHeader = 'Authorization'

describe('Guest deletion endpoint', () => {
	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.delete(route)
			.expect(401)
	})

	test('rejects w/ 404 if user has not purchased a wedding', async () => {
		await request(app)
			.delete(route)
			.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
			.expect(404)
	})

	test('rejects w/ 404 if guestId is not included in request params', async () => {
		await request(app)
			.delete(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.expect(404)
	})

	test('rejects w/ 404 if guest does not exist in the DB', async () => {
		await request(app)
			.delete(route + `/${guestTwoId}`)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.expect(404)
	})

	test('deletes a guest', async () => {
		await request(app)
			.delete(route + `/${guestOneId}`)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.expect(200)
	})
})
