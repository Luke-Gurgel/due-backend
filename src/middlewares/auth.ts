import { Request, Response, NextFunction } from 'express'
import User from 'src/models/user'
import { UserDoc } from '../models/user/types'
import jwt from 'jsonwebtoken'

export interface EnhancedRequest extends Request {
  user?: UserDoc;
  token?: string;
}

export const auth = async (req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).send({ error: 'jwt secret was undefined' })
  }

  const authHeader = req.header('Authorization')
  if (!authHeader) {
    return res.status(401).send({ error: 'Not authenticated. Missing authorization header' })
  }

  const [bearer, token] = authHeader.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(401).send({ error: 'Not authenticated. Badly formatted authorization header' })
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET) as { _id: string }
    const user = await User.findOne({ _id, 'tokens.token': token })

    if (!user) throw Error()

    req.user = user
    req.token = token
    next()
  } catch (e) {
    res.status(401).send({ error: 'Not authenticated.' })
  }
}
