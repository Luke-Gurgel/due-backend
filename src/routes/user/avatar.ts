import { Response, NextFunction } from 'express'
import sharp from 'sharp'
import { EnhancedRequest } from 'src/middlewares'

export const uploadAvatar = async (
	req: EnhancedRequest,
	res: Response,
): Promise<Response | void> => {
	if (!req.user) {
		return res.status(404).send({ error: 'Not authenticated' })
	}

	const buffer = await sharp(req.file.buffer)
		.resize(250, 250)
		.png()
		.toBuffer()

	req.user.avatar = buffer
	await req.user.save()
	res.status(200).send({ avatar: req.user.avatar })
}

export const avatarErrorHandler = (
	error: Error,
	req: EnhancedRequest,
	res: Response,
	next: NextFunction,
): void => {
	res.status(400).send({ error: error.message })
}
