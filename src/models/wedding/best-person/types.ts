export enum BestPersonRole {
  PADRINHO = 'padrinho',
  MADRINHA = 'madrinha',
  DAMA_DE_HONRA = 'dama de honra',
  PAJEM = 'pajem'
}

export interface BestPerson {
  _id: string
  name: string
  message: string
  role: BestPersonRole
  photo: Buffer
}
