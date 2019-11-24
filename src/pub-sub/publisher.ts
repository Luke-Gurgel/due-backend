import eventEmitter from './events'
import { AppEvent } from 'src/types'

export default class Publisher {
	protected static publish(event: AppEvent, ...args: any[]): void {
		eventEmitter.emit(event, ...args)
	}
}
