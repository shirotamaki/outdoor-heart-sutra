export type LocationProps = { lat: number; lng: number } | null

export type Sutra = { id: number; kanji: string }

export type Photo = {
  id: number
  note: string
  address: string
  longitude: number
  latitude: number
  image_url: string
  cropped_image_url: string
  user_id: number
  sutra_id: number
}

export type SutraListProps = {
  sutras: Sutra[]
  photos: Photo[]
}

export type SutraDetailsProps = {
  sutra: Sutra
  photo: Photo
}
