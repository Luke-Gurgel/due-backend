import request from 'supertest'
import app from 'src/app'
import User from 'src/models/user'
import { userBody, clearDB } from './__fixtures__/db'

beforeEach(clearDB)

test('should sign up a new user, given valid request body', async () => {
  const res = await request(app)
    .post('/users/signup')
    .send(userBody)
    .expect(201)

  const createdUser = await User.findById(res.body.user._id)
  expect(createdUser).not.toBeNull()
  createdUser && expect(createdUser.password).not.toBe(userBody.password)
  createdUser && expect(res.body).toMatchObject({
    user: { fullname: `${userBody.fname} ${userBody.lname}`, email: userBody.email },
    token: createdUser.tokens[0].token
  })
})