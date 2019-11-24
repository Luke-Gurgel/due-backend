import request from 'supertest'
import User from 'src/models/user'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { userBody } from '__tests__/__fixtures__/users'

afterEach(clearDB)

const route = '/users/signup'

describe('User signup', () => {
	test('signs up new user, given valid request body', async () => {
		const res = await request(app)
			.post(route)
			.send(userBody)
			.expect(201)

		expect(res.body.user).toBeDefined()
		expect(res.body.token).toBeDefined()
	})

	test("hashes user's password before storing it in the DB", async () => {
		await request(app)
			.post(route)
			.send(userBody)
			.expect(201)

		const createdUser = await User.findOne({ email: userBody.email })
		if (!createdUser) throw Error()

		expect(createdUser.password).not.toBe(userBody.password)
	})

	test('rejects w/ 500 if email is invalid', async () => {
		const res = await request(app)
			.post(route)
			.send({ ...userBody, email: 'invalidemail.com' })
			.expect(500)

		expect(res.body.error.errors.email).toBeDefined()
	})

	test('rejects w/ 400 if no name is provided', async () => {
		await request(app)
			.post(route)
			.send({ email: 'test@example.com', password: 'IunnaIsFive' })
			.expect(400)
	})

	test('rejects w/ 500 if password is too short', async () => {
		const res = await request(app)
			.post(route)
			.send({ ...userBody, password: 'mimo' })
			.expect(500)

		expect(res.body.error.errors.password).toBeDefined()
		expect(res.body.error.errors.password.message).toBe('Password is too short')
	})

	test('rejects w/ 500 if password contains the word password', async () => {
		const res = await request(app)
			.post(route)
			.send({ ...userBody, password: 'Mimopassword' })
			.expect(500)

		expect(res.body.error.errors.password).toBeDefined()
		expect(res.body.error.errors.password.message).toBe(
			'Password cannot contain the word "password"',
		)
	})

	test('rejects w/ 400 if another user with the same email already exists', async () => {
		const user = new User(userBody)
		await user.save()

		await request(app)
			.post(route)
			.send(userBody)
			.expect(400)
	})
})
