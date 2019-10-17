import { Router } from 'express'
import { auth } from 'src/middlewares'
import { createUser } from './create'
import { loginUser } from './login'
import { logoutUser } from './logout'
import { getUserProfile } from './profile'

const userRouter = Router()

userRouter.route('/users/signup')
  .post(createUser)

userRouter.route('/users/login')
  .post(loginUser)

userRouter.route('/users/logout')
  .post(auth, logoutUser)

userRouter.route('/users/me')
  .get(auth, getUserProfile)

export default userRouter
