export interface Instruction {
  id: string
  title: string
  message: string
}

export interface Coords {
  lat: number
  long: number
}

export interface EventLocation {
  locationName: string,
  address: string
  coords: Coords
}

export interface Event {
  photos: Buffer[]
  location: EventLocation
  eventDate: Date,
  instructions: Instruction[]
}
