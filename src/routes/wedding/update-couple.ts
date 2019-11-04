import { Response, Request } from 'express'
import { AuthenticatedWeddingRequest } from 'src/types'
import { Couple, NewlyWed } from 'src/models/wedding'

export const updateCouple = async (request: Request, res: Response): Promise<Response | void> => {
	const req = request as AuthenticatedWeddingRequest

	const validFields = ['brideName', 'groomName', 'coupleStory']
	const bodyFields = Object.keys(req.body)
	const isValidUpdate = bodyFields.every(field => validFields.includes(field))

	if (!isValidUpdate) {
		return res
			.status(400)
			.send({ error: 'Invalid update. Valid fields are ' + validFields.join(', ') })
	}

	const { groomPhoto, bridePhoto } = req.files as { groomPhoto: any; bridePhoto: any }

	const couple: Couple = {}
	const groom: NewlyWed = {}
	const bride: NewlyWed = {}

	if (req.body.groomName) groom.name = req.body.groomName
	if (groomPhoto) groom.photo = groomPhoto[0].buffer
	if (req.body.brideName) bride.name = req.body.brideName
	if (bridePhoto) bride.photo = bridePhoto[0].buffer

	if (Object.keys(groom).length) couple.groom = groom
	if (Object.keys(bride).length) couple.bride = bride
	if (req.body.coupleStory) couple.coupleStory = req.body.coupleStory

	req.wedding.couple = { ...req.wedding.couple, ...couple }

	try {
		await req.wedding.save()
		res.status(200).end()
	} catch (error) {
		res.status(500).send({ error })
	}
}
