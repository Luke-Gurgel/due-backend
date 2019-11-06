import { Router } from 'express'
import { auth, avatar } from 'src/middlewares'
import { signupUser } from './user-signup'
import { loginUser } from './user-login'
import { logoutUser } from './user-logout'
import { getUserProfile } from './user-profile-get'
import { updateUser } from './user-update'
import { uploadUserAvatar, avatarErrorHandler } from './user-avatar-upload'

const userRouter = Router()

userRouter.route('/users/signup').post(signupUser)

userRouter.route('/users/login').post(loginUser)

userRouter.route('/users/logout').post(auth, logoutUser)

userRouter
	.route('/users/me/avatar')
	.post(auth, avatar.single('avatar'), uploadUserAvatar, avatarErrorHandler)

userRouter
	.route('/users/me')
	.get(auth, getUserProfile)
	.patch(auth, updateUser)

export default userRouter
