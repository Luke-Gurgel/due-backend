import { Router } from 'express'
import { createUser } from './create'

const userRouter = Router()

userRouter.route('/users/signup')
  .post(createUser)

export default userRouter
