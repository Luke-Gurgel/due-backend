import { Router } from 'express'
import { auth, avatar } from 'src/middlewares'
import { createUser } from './create'
import { loginUser } from './login'
import { logoutUser } from './logout'
import { getUserProfile } from './profile'
import { updateUser } from './update'
import { uploadAvatar, avatarErrorHandler } from './avatar'

const userRouter = Router()

userRouter.route('/users/signup').post(createUser)

userRouter.route('/users/login').post(loginUser)

userRouter.route('/users/logout').post(auth, logoutUser)

userRouter
	.route('/users/me/avatar')
	.post(auth, avatar.single('avatar'), uploadAvatar, avatarErrorHandler)

userRouter
	.route('/users/me')
	.get(auth, getUserProfile)
	.patch(auth, updateUser)

export default userRouter
