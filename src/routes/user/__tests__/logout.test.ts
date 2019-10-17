import request from 'supertest'
import app from 'src/app'
import { setupDB, clearDB, userOne, userOneId, userTwo, userTwoId } from './__fixtures__/db'
import User from 'src/models/user'

beforeEach(setupDB)

const route = '/users/logout'
const authHeader = 'Authorization'

test('should log out a user by removing the auth token from tokens array', async () => {
  const token = userTwo.tokens[0].token

  await request(app)
    .post(route)
    .set(authHeader, 'Bearer ' + token)
    .expect(200)

  const user = await User.findById(userOneId)

  expect(user).not.toBeNull()
  expect(user && user.tokens).toHaveLength(1);
  expect(user && user.tokens[0].token).not.toEqual(token)
})

test('should remove all tokens from tokens array if { allDevices: true } is sent in the request body', async () => {
  await request(app)
    .post(route)
    .send({ allDevices: true })
    .set(authHeader, 'Bearer ' + userTwo.tokens[1].token)
    .expect(200)

  const user = await User.findById(userTwoId)
  expect(user).not.toBeNull()
  expect(user && user.tokens).toHaveLength(0);
})

test('should reject with a 401 if missing auth header', async () => {
  await request(app)
    .post(route)
    .expect(401)
})

test('should reject with a 401 if auth header is poorly formatted', async () => {
  await request(app)
    .post(route)
    .set(authHeader, 'Bear' + userOne.tokens[0].token)
    .expect(401)
})

test('should reject with a 404 if auth token is invalid', async () => {
  await request(app)
    .post(route)
    .set(authHeader, 'Bearer ' + '')
    .expect(401)
})

test('should reject with a 404 if auth token does not belong to any user', async () => {
  clearDB()

  await request(app)
    .post(route)
    .set(authHeader, 'Bearer ' + userOne.tokens[0].token)
    .expect(404)
})