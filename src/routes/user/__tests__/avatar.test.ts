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

const route = '/users/me/avatar'
const authHeader = 'Authorization'

test('should upload avatar image', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.attach('avatar', '__tests__/__assets__/mimo.jpg')
		.expect(200)

	const userWithAvatar = await User.findById(userOneId)
	if (!userWithAvatar) throw Error()

	expect(userWithAvatar.avatar).toEqual(expect.any(Buffer))
})

test('should not upload avatar if not authenticated', async () => {
	await request(app)
		.post(route)
		.attach('avatar', '__tests__/__assets__/mimo.jpg')
		.expect(401)
})

test('should not upload avatar if file has invalid format', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.attach('avatar', '__tests__/__assets__/meetup.HEIC')
		.expect(400)

	// console.log(JSON.parse(res.error.text).error)
})

test('should not upload avatar if file is over 1mb', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.attach('avatar', '__tests__/__assets__/img.jpg')
		.expect(400)

	// console.log(JSON.parse(res.error.text).error)
})
