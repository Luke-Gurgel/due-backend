import { Router, Request, Response, NextFunction } from 'express'
import UserMiddleware from '../middleware/user-middleware'
import UserController from '../controllers/user-controller'
import UserErrorHandler from '../error-handlers/user-error-handler'
import authMiddleware from '../../shared/auth-middleware'

const userRouter = Router()

userRouter.route('/users/signup').post(UserMiddleware.signupValidator, UserController.signup)
userRouter.route('/users/login').post(UserMiddleware.loginValidator, UserController.login)
userRouter.route('/users/logout').post(authMiddleware, UserController.logout)

userRouter
	.route('/users/me')
	.all(authMiddleware)
	.get(UserController.getProfile)
	.post(
		UserMiddleware.userUpdateValidator,
		UserMiddleware.avatarValidator().single('avatar'),
		UserController.updateProfile,
		UserMiddleware.avatarErrorHandler,
	)

userRouter.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	return new UserErrorHandler(error, res)
})

export default userRouter
