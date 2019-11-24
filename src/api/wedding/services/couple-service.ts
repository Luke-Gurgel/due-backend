import { UpdateCoupleDto, Couple } from 'src/types'

export default class CoupleService {
	public static async updateCouple({ wedding, couple }: UpdateCoupleDto): Promise<Couple> {
		wedding.couple = couple
		wedding.save()
		return wedding.couple
	}
}
