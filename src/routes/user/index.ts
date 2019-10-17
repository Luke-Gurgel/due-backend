import { Router } from 'express'
import { auth } from 'src/middlewares'
import { createUser } from './create'
import { logoutUser } from './logout'

const userRouter = Router()

userRouter.route('/users/signup')
  .post(createUser)

userRouter.route('/users/logout')
  .post(auth, logoutUser)

export default userRouter
