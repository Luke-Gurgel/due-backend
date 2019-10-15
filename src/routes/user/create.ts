import { Request, Response } from 'express'
import User from 'src/models/user'

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateJwt()
    console.log('user', user);
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send({ error })
  }
}
