import request from 'supertest'
import User from 'src/models/user'
import Wedding from 'src/models/wedding'
import { app, clearDB } from '__tests__/__fixtures__/db'
import { weddingOne } from '__tests__/__fixtures__/weddings'
import { userOne, userThree } from '__tests__/__fixtures__/users'

beforeEach(async () => {
	await clearDB()
	await new User(userOne).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
})

afterAll(clearDB)

const route = '/wedding/event'
const authHeader = 'Authorization'

describe('Update wedding event endpoint', () => {
	test('rejects w/ 401 if not authenticated', async () => {
		await request(app)
			.post(route)
			.expect(401)
	})

	test('rejects w/ 404 if user has not purchased a wedding', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
			.expect(404)
	})

	test('rejects w/ 500 if request body contains invalid field', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ invalidField: 'hello' })
			.expect(500)
	})

	test('rejects w/ 400 if one of the photos is over 1mb', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.attach('photos', '__tests__/__assets__/img.jpg')
			.expect(400)
	})

	test('rejects w/ 400 if one of the photos has unsupported format', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.attach('photos', '__tests__/__assets__/meetup.HEIC')
			.expect(400)
	})

	test('rejects w/ 400 if more than 3 photos are uploaded', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.expect(400)
	})

	test('updates wedding event with location address', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ locationAddress: 'Rua das Acácias' })
			.expect(200)
	})

	test('updates wedding event with location name and 3 photos', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.attach('photos', '__tests__/__assets__/mimo.jpg')
			.field('locationName', 'Igreja dos bons ventos')
			.expect(200)
	})

	test('rejects w/ 500 if request attempts to add an instruction without a title', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ instructions: [{ message: 'hey there' }] })
			.expect(500)
	})

	test('adds instructions with invalid fields, but omitting them', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ instructions: [{ title: 'hey there', what: 'lol' }] })
			.expect(200)

		expect(res.body.event.instructions[0]).not.toHaveProperty('what')
	})
})
