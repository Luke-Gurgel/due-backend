import { WeddingDoc } from 'src/types'
import Wedding from 'src/models/wedding'

export default class WeddingDAL {
	public static async findByOwner(userId: string): Promise<WeddingDoc | null> {
		const wedding = await Wedding.findOne({ ownerId: userId })
		return wedding
	}
}
