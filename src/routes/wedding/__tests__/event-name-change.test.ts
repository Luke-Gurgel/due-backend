import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { Wedding } from 'src/models/wedding'
import { clearDB } from '__tests__/__fixtures__/db'
import { userOne, userTwo, userThree } from '__tests__/__fixtures__/users'
import { weddingOne, weddingTwo } from '__tests__/__fixtures__/weddings'

beforeEach(async () => {
	await clearDB()
	await new User(userOne).save()
	await new User(userTwo).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
	await new Wedding(weddingTwo).save()
})

afterAll(clearDB)

const route = '/wedding/eventName'
const authHeader = 'Authorization'

test('should not allow name change if not authenticated', async () => {
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

test('should not allow name change if the request body does not contain the new name', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userTwo.tokens[0].token)
		.expect(400)
})

test('should not allow name change if event has been activated', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userTwo.tokens[0].token)
		.send({ eventName: 'A new name' })
		.expect(403)
})

test('should update the wedding event name', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ eventName: 'An unique name' })
		.expect(200)
})
