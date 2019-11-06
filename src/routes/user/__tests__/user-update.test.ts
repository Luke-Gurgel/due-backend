import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { clearDB } from '__tests__/__fixtures__/db'
import { userOne, userOneId } from '__tests__/__fixtures__/users'

beforeEach(async () => {
	await User.deleteMany(null)
	await new User(userOne).save()
})
afterAll(clearDB)

const route = '/users/me'
const authHeader = 'Authorization'

test('should update user profile', async () => {
	await request(app)
		.patch(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ lname: 'Messi' })
		.expect(200)

	const user = await User.findById(userOneId)
	if (!user) throw Error()
	expect(user.lname).toBe('Messi')
})

test('should not update user if any of the fields is invalid', async () => {
	await request(app)
		.patch(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ invalidField: 'what?' })
		.expect(400)
})

test('should not update user if not authenticated', async () => {
	await request(app)
		.patch(route)
		.send({ lname: 'Pratt' })
		.expect(401)

	const user = await User.findById(userOneId)
	if (!user) throw Error()
	expect(user.lname).toBe('Alves')
})

test('should not update user with invalid email', async () => {
	await request(app)
		.patch(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ email: 'invalidemail.com' })
		.expect(400)
})

test('should not update user with invalid password', async () => {
	await request(app)
		.patch(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ password: '123password' })
		.expect(400)
})
