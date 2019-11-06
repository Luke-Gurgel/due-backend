import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'

export const updateUser = async (req: EnhancedRequest, res: Response): Promise<Response | void> => {
  const { user } = req

  if (!user) {
    return res.status(401).send({ error: 'Not authenticated' })
  }

  const bodyFields = Object.keys(req.body)
  const validFields = ['fname', 'lname', 'email', 'password']
  const isValidOperation = bodyFields.every(field => validFields.includes(field))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid operation' })
  }

  try {
    bodyFields.forEach(field => user[field] = req.body[field])
    await user.save()
    res.status(200).send()
  } catch (error) {
    res.status(400).send({ error })
  }
}
