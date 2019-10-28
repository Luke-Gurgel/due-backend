import request from 'supertest'
import app from 'src/app'
import { DueEventStatus } from 'src/models/wedding'
import { clearDB, setupDB, userOne, userOneId } from '__tests__/__fixtures__/db'

beforeEach(setupDB)
afterEach(clearDB)

const route = '/wedding/create'
const authHeader = 'Authorization'

test('should create and return a new wedding', async () => {
	const res = await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	expect(res.body.wedding).toBeDefined()
})

test('newly created wedding should be associated with a specific user', async () => {
	const res = await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	if (!res.body.wedding) throw Error()
	expect(userOneId.toHexString()).toEqual(res.body.wedding.ownerId)
})

test('newly created wedding should have inactive status by default', async () => {
	const res = await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(200)

	if (!res.body.wedding) throw Error()
	expect(res.body.wedding.status).toBe(DueEventStatus.INACTIVE)
})

test('should not create wedding if not authenticated', async () => {
	await request(app)
		.post(route)
		.expect(401)
})
