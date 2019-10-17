import { Router } from 'express'
import { auth } from 'src/middlewares'
import { createUser } from './create'
import { loginUser } from './login'
import { logoutUser } from './logout'

const userRouter = Router()

userRouter.route('/users/signup')
  .post(createUser)

userRouter.route('/users/login')
  .post(loginUser)

userRouter.route('/users/logout')
  .post(auth, logoutUser)

export default userRouter
