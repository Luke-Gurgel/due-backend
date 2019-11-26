import request from 'supertest'
import User from 'src/models/user'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { userOne, userOneId } from '__tests__/__fixtures__/users'

beforeEach(async () => {
	await User.deleteMany(null)
	await new User(userOne).save()
})

afterAll(clearDB)

const route = '/users/me'
const authHeader = 'Authorization'

describe('Update user endpoint', () => {
	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.post(route)
			.send({ lname: 'Pratt' })
			.expect(401)

		const user = await User.findById(userOneId)
		if (!user) throw Error()
		expect(user.lname).toBe('Alves')
	})

	test('rejects w/ 500 if new email is invalid', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ email: 'invalidemail.com' })
			.expect(500)
	})

	test('rejects w/ 500 if password does not meet criteria', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ password: '123password' })
			.expect(500)
	})

	test('rejects w/ 500 if request body contains invalid field', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ hello: 'im_invalid' })
			.expect(500)
	})

	test('rejects w/ 401 for avatar only update if not authenticated', async () => {
		await request(app)
			.post(route)
			.attach('avatar', '__tests__/__assets__/mimo.jpg')
			.expect(401)

		const user = await User.findById(userOneId)
		expect(user?.avatar).toBeUndefined()
	})

	test('rejects w/ 400 if avatar file has unsupported format', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('avatar', '__tests__/__assets__/meetup.HEIC')
			.expect(400)

		expect(res.body.error.startsWith('Unsupported file type')).toBeTruthy()
	})

	test('rejects w/ 400 if avatar file is over 1mb', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('avatar', '__tests__/__assets__/img.jpg')
			.expect(400)

		expect(res.body.error).toBe('File too large')
	})

	test('updates user profile', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ lname: 'Messi' })
			.expect(200)

		expect(res.body.user).toBeDefined()
		expect(res.body.user.lname).toBe('Messi')
	})

	test("updates user's avatar", async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('avatar', '__tests__/__assets__/mimo.jpg')
			.expect(200)

		const userWithAvatar = await User.findById(userOneId)
		if (!userWithAvatar) throw Error()

		expect(userWithAvatar.avatar).toEqual(expect.any(Buffer))
	})

	test("updates user's avatar and name in a single request", async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('avatar', '__tests__/__assets__/mimo.jpg')
			.field('lname', 'Ronaldo')
			.field('fname', 'Cristiano')
			.expect(200)

		const userWithAvatar = await User.findById(userOneId)
		if (!userWithAvatar) throw Error()

		expect(userWithAvatar.avatar).toEqual(expect.any(Buffer))
		expect(userWithAvatar.fname).toBe('Cristiano')
		expect(userWithAvatar.lname).toBe('Ronaldo')
	})
})
