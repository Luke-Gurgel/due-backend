import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { setupDB, clearDB, userOne } from '__tests__/__fixtures__/db'

beforeEach(setupDB)
afterAll(clearDB)

const route = '/users/login'

test('should log in an existing user', async () => {
	const res = await request(app)
		.post(route)
		.send({ email: userOne.email, password: userOne.password })
		.expect(200)

	const loggedUser = await User.findById(res.body.user._id)
	if (!loggedUser) throw Error()
	expect(loggedUser.tokens[1].token).toBe(res.body.token)
})

test('should not log in a nonexistent user', async () => {
	await request(app)
		.post(route)
		.send({ email: 'idontexist@example.com', password: 'badpass' })
		.expect(400)
})

test('should reject with 400 if password is missing', async () => {
	await request(app)
		.post(route)
		.send({ email: 'lol123@mail.com' })
		.expect(400)
})

test('should reject with 400 if email is missing', async () => {
	await request(app)
		.post(route)
		.send({ password: 'HUIASDHIdhasi787' })
		.expect(400)
})
