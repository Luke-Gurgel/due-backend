import { Router } from 'express'
import { auth, avatar } from 'src/middlewares'
import { signupUser } from './signup'
import { loginUser } from './login'
import { logoutUser } from './logout'
import { getUser } from './get-user'
import { updateUser } from './update'
import { uploadAvatar, avatarErrorHandler } from './avatar'

const userRouter = Router()

userRouter.route('/users/signup').post(signupUser)

userRouter.route('/users/login').post(loginUser)

userRouter.route('/users/logout').post(auth, logoutUser)

userRouter
	.route('/users/me/avatar')
	.post(auth, avatar.single('avatar'), uploadAvatar, avatarErrorHandler)

userRouter
	.route('/users/me')
	.get(auth, getUser)
	.patch(auth, updateUser)

export default userRouter
