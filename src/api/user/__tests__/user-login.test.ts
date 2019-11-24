import request from 'supertest'
import User from 'src/models/user'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { userOne } from '__tests__/__fixtures__/users'

beforeEach(async () => {
	await User.deleteMany(null)
	await new User(userOne).save()
})

afterAll(clearDB)

const route = '/users/login'

describe('User login endpoint', () => {
	test('logs in an existing user', async () => {
		const res = await request(app)
			.post(route)
			.send({ email: userOne.email, password: userOne.password })
			.expect(200)

		const loggedUser = await User.findById(res.body.user._id)
		if (!loggedUser) throw Error()
		expect(loggedUser.tokens[1].token).toBe(res.body.token)
	})

	test('rejects w/ 500 if user does not exist', async () => {
		await request(app)
			.post(route)
			.send({ email: 'idontexist@example.com', password: 'badpass' })
			.expect(400)
	})

	test('rejects w/ 400 if password is missing', async () => {
		await request(app)
			.post(route)
			.send({ email: 'lol123@mail.com' })
			.expect(400)
	})

	test('rejects w/ 400 if email is missing', async () => {
		await request(app)
			.post(route)
			.send({ password: 'HUIASDHIdhasi787' })
			.expect(400)
	})
})
