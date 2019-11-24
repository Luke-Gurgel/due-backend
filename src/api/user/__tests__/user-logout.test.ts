import request from 'supertest'
import User from 'src/models/user'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { userOne, userOneId, userTwo, userTwoId } from '__tests__/__fixtures__/users'

beforeEach(async () => {
	await User.deleteMany(null)
	await new User(userOne).save()
	await new User(userTwo).save()
})

afterAll(clearDB)

const route = '/users/logout'
const authHeader = 'Authorization'

describe('User logout endpoint', () => {
	test('removes auth token from user.tokens array', async () => {
		const token = userTwo.tokens[0].token

		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + token)
			.expect(200)

		const user = await User.findById(userOneId)

		if (!user) throw Error()
		expect(user.tokens).toHaveLength(1)
		expect(user.tokens[0].token).not.toEqual(token)
	})

	test('removes all tokens from user.tokens array if { allDevices: true } is sent in the request body', async () => {
		await request(app)
			.post(route)
			.send({ allDevices: true })
			.set(authHeader, 'Bearer ' + userTwo.tokens[1].token)
			.expect(200)

		const user = await User.findById(userTwoId)
		if (!user) throw Error()
		expect(user.tokens).toHaveLength(0)
	})

	test('rejects w/ 401 if missing auth header', async () => {
		await request(app)
			.post(route)
			.expect(401)
	})

	test('rejects w/ 401 if auth header is poorly formatted', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bear' + userOne.tokens[0].token)
			.expect(401)
	})

	test('rejects w/ 404 if auth token is invalid', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + '')
			.expect(401)
	})
})
