import request from 'supertest'
import User from 'src/models/user'
import Wedding from 'src/models/wedding'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { userOne, userTwo, userThree } from '__tests__/__fixtures__/users'
import { weddingOne, weddingTwo } from '__tests__/__fixtures__/weddings'

beforeAll(clearDB)

beforeEach(async () => {
	await new User(userOne).save()
	await new User(userTwo).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
	await new Wedding(weddingTwo).save()
})

afterEach(clearDB)

const route = '/wedding/adminAccess'
const authHeader = 'Authorization'

describe('Wedding admin access endpoint', () => {
	test('returns the admin version of the wedding w/ 200 status code', async () => {
		const res = await request(app)
			.get(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.expect(200)

		expect(res.body.wedding).toBeDefined()
		expect(res.body.wedding.sharedPhotos).toBeUndefined()
		expect(res.body.wedding.sharedMessages).toBeUndefined()
	})

	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.get(route)
			.expect(401)
	})

	test("rejects w/ 404 if user hasn't purchased a wedding event", async () => {
		const res = await request(app)
			.get(route)
			.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
			.expect(404)

		expect(res.body.error).toBe('User has not purchased an event.')
	})
})
