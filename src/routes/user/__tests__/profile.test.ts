import request from 'supertest'
import app from 'src/app'
import { userOne, setupDB, clearDB } from './__fixtures__/db'

beforeEach(setupDB)
afterAll(clearDB)

const route = '/users/me'
const authHeader = 'Authorization'

test('should return user public profile', async () => {
	const res = await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	expect(res.body.user).not.toBeNull()
	expect(res.body.user.password).toBeUndefined()
	expect(res.body.user.tokens).toBeUndefined()
})

test('should not return profile for unauthorized user', async () => {
	await request(app)
		.get('/users/me')
		.send()
		.expect(401)
})
