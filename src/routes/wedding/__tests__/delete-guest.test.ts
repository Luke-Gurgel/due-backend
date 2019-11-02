import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { Wedding, Guest } from 'src/models/wedding'
import { clearDB } from '__tests__/__fixtures__/db'
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

test('should not allow guest deletion if not authenticated', async () => {
	await request(app)
		.delete(route + `/${guestOneId}`)
		.expect(401)
})

test('should return 404 with user has not purchased a wedding', async () => {
	await request(app)
		.delete(route + `/${guestOneId}`)
		.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
		.expect(404)
})

test('should return 400 if guestId is not included as a request param', async () => {
	await request(app)
		.delete(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(404)
})

test('should return 404 if guest does not exist in the DB', async () => {
	await request(app)
		.delete(route + `/${guestTwoId}`)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(404)
})

test('should find and delete guest by id', async () => {
	await request(app)
		.delete(route + `/${guestOneId}`)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)
})
