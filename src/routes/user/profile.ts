import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'

export const getUserProfile = async (req: EnhancedRequest, res: Response): Promise<Response | void> => {
  res.status(200).send({ user: req.user })
}
