import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { userBody, clearDB } from './__fixtures__/db'

afterEach(clearDB)

const signupRoute = '/users/signup'

test('should sign up a new user, given valid request body', async () => {
  const res = await request(app)
    .post(signupRoute)
    .send(userBody)
    .expect(201)

  const createdUser = await User.findOne({ email: userBody.email })
  expect(createdUser).not.toBeNull()
  createdUser && expect(createdUser.password).not.toBe(userBody.password)
  createdUser && expect(res.body).toEqual({
    token: createdUser.tokens[0].token
  })
})

test('should not sign up a new user if email is invalid', async () => {
  await request(app)
    .post(signupRoute)
    .send({ ...userBody, email: 'invalidemail.com' })
    .expect(400)
})

test('should not sign up a new user if no name is provided', async () => {
  await request(app)
    .post(signupRoute)
    .send({ email: 'test@example.com', password: 'IunnaIsFive' })
    .expect(400)
})

test('should not sign up a new user if password is too short', async () => {
  await request(app)
    .post(signupRoute)
    .send({ ...userBody, password: 'mimo' })
    .expect(400)
})

test('should not sign up a new user if password contains the word password', async () => {
  await request(app)
    .post(signupRoute)
    .send({ ...userBody, password: 'Mimopassword' })
    .expect(400)
})

test('should not sign up user if another user with the same email already exists', async () => {
  const user = new User(userBody)
  await user.save()

  await request(app)
    .post(signupRoute)
    .send(userBody)
    .expect(400)

})