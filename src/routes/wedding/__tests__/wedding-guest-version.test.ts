import request from 'supertest'
import app from 'src/app'
import { clearDB, setupDB, userTwo, weddingTwoEventName } from '__tests__/__fixtures__/db'
import { GuestVersion, DueEventStatus } from 'src/models/wedding'

beforeEach(setupDB)
afterEach(clearDB)

const route = '/wedding/guestAccess'
const authHeader = 'Authorization'

test('should only return active wedding events', async () => {
	const res = await request(app)
		.get(route + `?eventName=${weddingTwoEventName}`)
		.set(authHeader, 'Bearer ' + userTwo.tokens[0].token)
		.expect(200)

	if (!res.body.weddings) throw Error()

	const inactiveEvents = res.body.weddings.filter(
		(wedding: GuestVersion) => wedding.status === DueEventStatus.INACTIVE,
	)

	expect(inactiveEvents).toHaveLength(0)
})

test('should return status 400 if query string is empty', async () => {
	await request(app)
		.get(route)
		.set(authHeader, 'Bearer ' + userTwo.tokens[0].token)
		.expect(400)
})

test('should not return weddings if not authenticated', async () => {
	await request(app)
		.get(route)
		.expect(401)
})
