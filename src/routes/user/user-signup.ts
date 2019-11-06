import { Request, Response } from 'express'
import User from 'src/models/user'

export const signupUser = async (req: Request, res: Response): Promise<Response | void> => {
	const userWithSameEmail = await User.findOne({ email: req.body.email })

	if (userWithSameEmail) {
		return res.status(400).send({ error: 'User with same email already exists.' })
	}

	const user = new User(req.body)

	try {
		await user.save()
		const token = await user.generateJwt()
		res.status(201).send({ token })
	} catch (error) {
		res.status(400).send({ error })
	}
}
