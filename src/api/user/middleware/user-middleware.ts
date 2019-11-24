import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import UserDAL from '../data-access/user-dal'

export default class UserMiddleware {
	public static async loginValidator(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).send({ error: 'Missing required field' })
		}

		next()
	}

	public static async signupValidator(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		const { fname, lname, email, password } = req.body

		if (!fname || !lname || !email || !password) {
			return res.status(400).send({ error: 'Missing required field' })
		}

		const emailTaken = await UserDAL.isEmailTaken(email)

		if (emailTaken) {
			return res.status(400).send({ error: 'User is already registered' })
		}

		next()
	}

	public static async userUpdateValidator(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		const validFields = ['fname', 'lname', 'email', 'password']
		const isValidUpdate = Object.keys(req.body).every((field: string) =>
			validFields.includes(field),
		)

		if (isValidUpdate === false) {
			return res.status(400).send({ error: 'Request body contains invalid field(s)' })
		}

		next()
	}

	public static avatarValidator(): multer.Instance {
		return multer({
			limits: { fileSize: 1000000, files: 1 },
			fileFilter(_, file, cb) {
				const isSupportedFileType = file.originalname.match(/\.(jpg|jpeg|png)$/)
				if (!isSupportedFileType) {
					const error = Error('Unsupported file type. Use jpg, jpeg or png.')
					return cb(error, false)
				}
				cb(null, true)
			},
		})
	}

	public static avatarErrorHandler(
		error: Error,
		_: Request,
		res: Response,
		next: NextFunction,
	): void {
		res.status(400).send({ error: error.message })
	}
}
