import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { Wedding } from 'src/models/wedding'
import { clearDB } from '__tests__/__fixtures__/db'
import { userOne, userThree } from '__tests__/__fixtures__/users'
import { weddingOne, weddingOneId } from '__tests__/__fixtures__/weddings'

beforeEach(async () => {
	await clearDB()
	await new User(userOne).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
})

// afterAll(clearDB)

const route = '/wedding/couple'
const authHeader = 'Authorization'

test('should not allow couple update if not authenticated', async () => {
	await request(app)
		.post(route)
		.expect(401)
})

test('should return 404 if user has not purchased a wedding', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userThree.tokens[0].token)
		.expect(404)
})

test('should return 400 if request contains invalid fields', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ blah: true })
		.expect(400)
})

test('should not add invalid fields into couple property', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.send({ groomAge: 28 })
		.expect(400)
})

test('should update couple property on wedding', async () => {
	await request(app)
		.post(route)
		.set(authHeader, 'Bearer ' + userOne.tokens[0].token)
		.attach('bridePhoto', '__tests__/__assets__/mimo.jpg')
		.field('brideName', 'Thais')
		.field('coupleStory', 'Um belo dia, no Bohemia...')
		.expect(200)

	const wedding = await Wedding.findById(weddingOneId)

	if (!wedding || !wedding.couple || !wedding.couple.bride) {
		throw Error()
	}

	expect(wedding.couple.groom).not.toBeDefined()
	expect(wedding.couple.bride.name).toBe('Thais')
	expect(wedding.couple.bride.photo).toBeDefined()
	expect(wedding.couple.coupleStory).toBe('Um belo dia, no Bohemia...')
})
