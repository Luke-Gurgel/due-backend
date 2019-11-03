import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { Wedding, Guest } from 'src/models/wedding'
import { clearDB } from '__tests__/__fixtures__/db'
import { weddingOne } from '__tests__/__fixtures__/weddings'
import { userOne, userThree } from '__tests__/__fixtures__/users'
import { guestOne, guestOneId, guestTwoId } from '__tests__/__fixtures__/guest'

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

test('should not allow guest update if not authenticated', async () => {
	await request(app)
		.patch(route + `/${guestOneId}`)
		.expect(401)
})

test('should return 404 if user has not purchased a wedding', async () => {
	await request(app)
		.patch(route + `/${guestOneId}`)
		.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
		.expect(404)
})

test('should return 400 if guestId is not included as a request param', async () => {
	await request(app)
		.patch(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.expect(404)
})

test('should return 404 if guest does not exist in the DB', async () => {
	await request(app)
		.patch(route + `/${guestTwoId}`)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ name: 'Manuel Turizo' })
		.expect(404)
})

test('should return 400 if request body is empty', async () => {
	await request(app)
		.patch(route + `/${guestOneId}`)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({})
		.expect(400)
})

test('should return 400 if any invalid field is included in the request body', async () => {
	await request(app)
		.patch(route + `/${guestOneId}`)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ name: 'Some new name', email: 'a_new_email@gmail.com', blah: true })
		.expect(400)

	const guest = await Guest.findById(guestOneId)
	if (!guest) throw Error()

	expect(guest.name).toBe(guestOne.name)
	expect(guest.email).toBe(guestOne.email)
})

test('should find and update guest by id', async () => {
	await request(app)
		.patch(route + `/${guestOneId}`)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ name: 'Some new name', email: 'a_new_email@gmail.com' })
		.expect(200)

	const guest = await Guest.findById(guestOneId)
	if (!guest) throw Error()

	expect(guest.name).toBe('Some new name')
	expect(guest.email).toBe('a_new_email@gmail.com')
	expect(guest.hasRSVP).toBe(false)
	expect(guest.emailSent).toBe(false)
})
