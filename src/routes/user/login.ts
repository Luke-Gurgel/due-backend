import { Request, Response } from 'express'
import User from 'src/models/user'

export const loginUser = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).send({ error: 'Missing required field' })
  }

  try {
    const user = await User.findByCredentials({ email, password })
    const token = await user.generateJwt()
    res.status(200).send({ user, token })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}
