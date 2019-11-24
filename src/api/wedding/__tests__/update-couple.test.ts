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

const route = '/wedding/couple'
const authHeader = 'Authorization'

describe('Update couple endpoint', () => {
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

	test('rejects w/ 400 if request body contains invalid field', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.send({ groomName: 'Joel', brideName: 'Victoria', invalidField: 'lol' })
			.expect(400)

		expect(res.body.error).toBe('Request body contains invalid field(s)')
	})

	test('rejects w/ 400 if groom photo is over 1mb', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('groomPhoto', '__tests__/__assets__/img.jpg')
			.expect(400)
	})

	test('rejects w/ 400 if bride photo is over 1mb', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('bridePhoto', '__tests__/__assets__/img.jpg')
			.expect(400)
	})

	test('rejects w/ 400 if groom photo has unsupported format', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('groomPhoto', '__tests__/__assets__/meetup.HEIC')
			.expect(400)

		expect(res.body.error.startsWith('Unsupported file type')).toBeTruthy()
	})

	test('rejects w/ 400 if bride photo has unsupported format', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('bridePhoto', '__tests__/__assets__/meetup.HEIC')
			.expect(400)

		expect(res.body.error.startsWith('Unsupported file type')).toBeTruthy()
	})

	test('rejects w/ 400 if 2 photos are included for the bridePhoto field', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('bridePhoto', '__tests__/__assets__/mimo.jpg')
			.attach('bridePhoto', '__tests__/__assets__/mimo.jpg')
			.expect(400)
	})

	test('rejects w/ 400 if 2 photos are included for the groomPhoto field', async () => {
		await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('groomPhoto', '__tests__/__assets__/mimo.jpg')
			.attach('groomPhoto', '__tests__/__assets__/mimo.jpg')
			.expect(400)
	})

	test('updates groom photo', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('groomPhoto', '__tests__/__assets__/mimo.jpg')
			.expect(200)

		expect(res.body.couple.groomPhoto).toBeDefined()
		expect(res.body.couple.progress).toBe('0.20')
	})

	test('updates bride photo', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('bridePhoto', '__tests__/__assets__/mimo.jpg')
			.expect(200)

		expect(res.body.couple.bridePhoto).toBeDefined()
		expect(res.body.couple.progress).toBe('0.20')
	})

	test('updates both groom and bride photos', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('bridePhoto', '__tests__/__assets__/mimo.jpg')
			.attach('groomPhoto', '__tests__/__assets__/mimo.jpg')
			.expect(200)

		expect(res.body.couple.bridePhoto).toBeDefined()
		expect(res.body.couple.groomPhoto).toBeDefined()
		expect(res.body.couple.progress).toBe('0.40')
	})

	test('updates all properties in the couple object', async () => {
		const res = await request(app)
			.post(route)
			.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
			.attach('bridePhoto', '__tests__/__assets__/mimo.jpg')
			.attach('groomPhoto', '__tests__/__assets__/mimo.jpg')
			.field('groomName', 'Joel')
			.field('brideName', 'Victoria')
			.field('coupleStory', 'Once upon a time...')
			.expect(200)

		expect(res.body.couple.groomName).toBeDefined()
		expect(res.body.couple.brideName).toBeDefined()
		expect(res.body.couple.bridePhoto).toBeDefined()
		expect(res.body.couple.groomPhoto).toBeDefined()
		expect(res.body.couple.coupleStory).toBeDefined()
		expect(res.body.couple.progress).toBe('1.00')
	})
})
