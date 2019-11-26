import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user-service'
import {
	AuthenticatedRequest,
	CreateUserDto,
	LoginUserDto,
	LogoutUserDto,
	UpdateUserDto,
} from 'src/types'

export default class UserController {
	public static async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
		const userDto: CreateUserDto = req.body

		try {
			const { user, token } = await UserService.createUser(userDto)
			res.status(201).send({ user, token })
		} catch (error) {
			next(error)
		}
	}

	public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		const loginDto: LoginUserDto = req.body

		try {
			const { user, token } = await UserService.loginUser(loginDto)
			res.status(200).send({ user, token })
		} catch (error) {
			next(error)
		}
	}

	public static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		const authenticatedRequest = req as AuthenticatedRequest
		const logoutDto: LogoutUserDto = {
			user: authenticatedRequest.user,
			token: authenticatedRequest.token,
			allDevices: authenticatedRequest.body.allDevices,
		}

		try {
			await UserService.logoutUser(logoutDto)
			res.status(200).end()
		} catch (error) {
			next(error)
		}
	}

	public static async getProfile(req: Request, res: Response): Promise<Response | void> {
		const { user } = req as AuthenticatedRequest
		res.status(200).send({ user: user.toJSON() })
	}

	public static async updateProfile(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { user, body, file: avatar } = req as AuthenticatedRequest
		const updateUserDto: UpdateUserDto = { user, avatar: avatar?.buffer, fields: body }

		try {
			const { user } = await UserService.updateUser(updateUserDto)
			res.status(200).send({ user })
		} catch (error) {
			next(error)
		}
	}
}
