import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { Wedding } from 'src/models/wedding'
import { clearDB } from '__tests__/__fixtures__/db'
import { userOne, userOneId } from '__tests__/__fixtures__/users'
import { weddingOne } from '__tests__/__fixtures__/weddings'

beforeEach(async () => {
	await User.deleteMany(null)
	await Wedding.deleteMany(null)
	await new User(userOne).save()
	await new Wedding(weddingOne).save()
})

afterAll(clearDB)

const route = '/users/me'
const authHeader = 'Authorization'

test('should return user public profile', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	expect(res.body.user).toBeDefined()
	expect(res.body.user).toHaveProperty('fname')
})

test('should not include sensitive data or messages and photos shared by that user', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	expect(res.body.user).toBeDefined()
	expect(res.body.user.tokens).toBeUndefined()
	expect(res.body.user.password).toBeUndefined()
	expect(res.body.user.sharedPhotos).toBeUndefined()
	expect(res.body.user.sharedMessages).toBeUndefined()
})

test('should include their Due event in case they have purchased one', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	expect(res.body.user.wedding).toBeDefined()
	expect(res.body.user.wedding.ownerId).toEqual(userOneId.toHexString())
})

test('should return portal version, i.e. shared messages and photos should not be included', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	expect(res.body.user.wedding.sharedMessages).toBeUndefined()
	expect(res.body.user.wedding.sharedPhotos).toBeUndefined()
})

test('should not return profile for unauthorized user', async () => {
	await request(app)
		.get('/users/me')
		.send()
		.expect(401)
})
