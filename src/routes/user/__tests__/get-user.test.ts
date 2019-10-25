import request from 'supertest'
import app from 'src/app'
import { userOne, setupDB, clearDB } from '__tests__/__fixtures__/db'

beforeEach(setupDB)
afterAll(clearDB)

const route = '/users/me'
const authHeader = 'Authorization'

test('should return user public profile', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	if (!res.body.user) throw Error()

	expect(res.body.user).toHaveProperty('fname')
	expect(res.body.user.password).toBeUndefined()
	expect(res.body.user.tokens).toBeUndefined()
})

test('should include user wedding in case s/he has one', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	expect(res.body.wedding).not.toBeUndefined()
	expect(res.body.user.id).toEqual(res.body.wedding.ownerId)
})

test('should return portal version, i.e. shared messages and photos should not be included', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	expect(res.body.wedding.sharedMessages).toBeUndefined()
	expect(res.body.wedding.sharedPhotos).toBeUndefined()
})

test('should not return profile for unauthorized user', async () => {
	await request(app)
		.get('/users/me')
		.send()
		.expect(401)
})
