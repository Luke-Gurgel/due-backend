import { Request, Response, NextFunction } from 'express'
import multer = require('multer')

export default class CoupleMiddleware {
	public static async updateCouple(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		const bodyFields = Object.keys(req.body)
		const validFields = ['groomName', 'groomPhoto', 'brideName', 'bridePhoto', 'coupleStory']

		const isValidUpdate = bodyFields.every(field => validFields.includes(field))
		if (!isValidUpdate) {
			return res.status(400).send({ error: 'Request body contains invalid field(s)' })
		}

		next()
	}

	public static updateCouplePhotos(): multer.Instance {
		return multer({
			limits: { fileSize: 1000000 },
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

	public static couplePhotosErrorHandler(
		error: Error,
		_: Request,
		res: Response,
		next: NextFunction,
	): void {
		res.status(400).send({ error: error.message })
	}
}
