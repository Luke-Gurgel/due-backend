import EventEmitter from 'events'
import { AppEvent, UserDoc } from 'src/types'

const eventEmitter = new EventEmitter()

eventEmitter.on(AppEvent.USER_SIGNUP, (newUser: UserDoc) => {
	console.log('event: ' + AppEvent.USER_SIGNUP + ', user email: ' + newUser.email)
})

export default eventEmitter
