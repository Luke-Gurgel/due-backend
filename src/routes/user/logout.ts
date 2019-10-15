import { Response } from 'express'
import { EnhancedRequest } from 'src/middlewares'

export const logoutUser = async (req: EnhancedRequest, res: Response): Promise<Response | void> => {
  const { user, token, body: { allDevices } } = req

  if (!user || !token) {
    return res.status(401).send({ error: 'Error: not authenticated' })
  }

  try {
    allDevices ? user.tokens = [] : user.tokens = user.tokens.filter(tok => tok.token !== token)
    await user.save()
    res.status(200).send()
  } catch (error) {
    res.status(500).send({ error })
  }
}
