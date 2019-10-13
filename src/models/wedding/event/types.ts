export interface Instruction {
  _id: string
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
  date: Date,
  instructions: Instruction[]
}
