import Guest from 'src/models/guest'
import { GuestDoc, WeddingDoc, AddGuestDto, UpdateGuestDto, DeleteGuestDto } from 'src/types'

export default class GuestService {
	public static async getGuestList(wedding: WeddingDoc): Promise<GuestDoc[]> {
		await wedding.populate('guestList').execPopulate()
		return wedding.guestList ?? []
	}

	public static async addGuest({ newGuest, wedding }: AddGuestDto): Promise<GuestDoc> {
		const guest = new Guest({ ...newGuest, weddingId: wedding._id })
		await guest.save()
		return guest
	}

	public static async updateGuest({ guestId, fields }: UpdateGuestDto): Promise<GuestDoc | null> {
		const guest = await Guest.findByIdAndUpdate(guestId, fields)
		if (!guest) throw Error('Guest not found:404')
		return guest
	}

	public static async deleteGuest({ guestId }: DeleteGuestDto): Promise<GuestDoc | null> {
		const guest = await Guest.findByIdAndDelete(guestId)
		if (!guest) throw Error('Guest not found:404')
		return guest
	}
}
