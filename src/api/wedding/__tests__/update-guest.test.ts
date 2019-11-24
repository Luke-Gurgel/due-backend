import request from 'supertest'
import User from 'src/models/user'
import Guest from 'src/models/guest'
import Wedding from 'src/models/wedding'
import GuestDAL from '../data-access/guest-dal'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { weddingOne } from '__tests__/__fixtures__/weddings'
import { userOne, userThree } from '__tests__/__fixtures__/users'
import { guestOne, guestOneId } from '__tests__/__fixtures__/guest'

beforeEach(async () => {
	await clearDB()
	await new User(userOne).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
	await new Guest(guestOne).save()
})

afterAll(clearDB)

const route = '/wedding/guests'
const authHeader = 'Authorization'

describe('Guest update endpoint', () => {
	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.patch(route)
			.expect(401)
	})

	test('rejects w/ 404 if user has not purchased a wedding', async () => {
		await request(app)
			.patch(route)
			.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
			.expect(404)
	})

	test('rejects w/ 404 if guestId is not included in request params', async () => {
		await request(app)
			.patch(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.expect(404)
	})

	test('rejects w/ 400 if request body is empty', async () => {
		const res = await request(app)
			.patch(route + `/${guestOneId}`)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({})
			.expect(400)

		expect(res.body.error).toBe('Request body cannot be empty')
	})

	test('rejects w/ 404 if guest does not exist in the DB', async () => {
		const res = await request(app)
			.patch(route + '/i_dont_exist')
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ name: 'blah' })
			.expect(404)

		expect(res.body.error).toBe('Guest not found')
	})

	test('rejects w/ 400 if any invalid field is included in the request body', async () => {
		const res = await request(app)
			.patch(route + `/${guestOneId}`)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ name: 'Some new name', email: 'a_new_email@gmail.com', blah: true })
			.expect(400)

		expect(res.body.error).toBe('Invalid update operation')

		const guest = await GuestDAL.findById(guestOneId.toHexString())
		if (!guest) throw Error()

		expect(guest.name).toBe(guestOne.name)
		expect(guest.email).toBe(guestOne.email)
	})

	test('updates a guest', async () => {
		await request(app)
			.patch(route + `/${guestOneId}`)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ name: 'Some new name', email: 'a_new_email@gmail.com' })
			.expect(200)

		const guest = await GuestDAL.findById(guestOneId.toHexString())
		if (!guest) throw Error()

		expect(guest.name).toBe('Some new name')
		expect(guest.email).toBe('a_new_email@gmail.com')
		expect(guest.hasRSVP).toBe(false)
		expect(guest.emailSent).toBe(false)
	})
})
