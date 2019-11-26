import { Event, UpdateEventDto } from 'src/types'
import ImageHandlingService from 'src/services/image'

export default class EventService {
	public static async updateEvent({ wedding, event }: UpdateEventDto): Promise<Event | undefined> {
		if (event.photos?.length) {
			event.photos.forEach(async (photo, i, array) => {
				array[i] = await ImageHandlingService.handleLocationPhoto(photo)
			})
		}

		for (const key in event) {
			const field = key as keyof Event
			wedding.set(`event.${field}`, event[field], { strict: 'throw' })
		}

		await wedding.save()
		return wedding.event
	}
}
