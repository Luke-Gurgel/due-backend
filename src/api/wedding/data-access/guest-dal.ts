import { GuestDoc } from 'src/types'
import Guest from 'src/models/guest'

export default class GuestDAL {
	public static async findById(guestId: string): Promise<GuestDoc | null> {
		const guest = await Guest.findById(guestId)
		return guest
	}
}
