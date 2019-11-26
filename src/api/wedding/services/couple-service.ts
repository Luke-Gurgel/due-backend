import { UpdateCoupleDto, Couple } from 'src/types'
import ImageHandlingService from 'src/services/image'

export default class CoupleService {
	public static async updateCouple({
		wedding,
		couple,
	}: UpdateCoupleDto): Promise<Couple | undefined> {
		if (couple.groomPhoto) {
			couple.groomPhoto = await ImageHandlingService.handleCouplePhoto(couple.groomPhoto)
		}

		if (couple.bridePhoto) {
			couple.bridePhoto = await ImageHandlingService.handleCouplePhoto(couple.bridePhoto)
		}

		for (const key in couple) {
			const field = key as keyof Couple
			wedding.set(`couple.${field}`, couple[field], { strict: 'throw' })
		}

		await wedding.save()
		return wedding.couple
	}
}
