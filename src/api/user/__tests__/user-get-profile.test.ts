import request from 'supertest'
import User from '../../../models/user'
import Wedding from 'src/models/wedding'
import { userOne } from '__tests__/__fixtures__/users'
import { app, clearDB } from '__tests__/__fixtures__/db'
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

describe('Get user profile endpoint', () => {
	test('returns user public profile', async () => {
		const res = await request(app)
			.get(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.expect(200)

		expect(res.body.user).toBeDefined()
		expect(res.body.user).toHaveProperty('fname')
	})

	test('does not include sensitive data or messages and photos shared by that user', async () => {
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

	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.get('/users/me')
			.expect(401)
	})
})
