export interface NewlyWed {
  name: string
  photo: Buffer
}

export interface Couple {
  groom: NewlyWed
  bride: NewlyWed
  coupleStory: string
}
