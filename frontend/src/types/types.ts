// components
export type ActionButtonProps = {
  onClick: () => void
  disabled?: boolean
  text: string
}

export type CustomHeadProps = {
  title?: string
  description?: string
  ogType?: string
  ogUrl?: string
  ogImage?: string
  siteName?: string
  favicon?: string
  twitterCard?: string
  twitterImage?: string
  twitterSite?: string
  appleTouchIcons?: { size: string; href: string }[]
  canonicalUrl?: string
  lang?: string
  isHomePage?: boolean
}

export type MenuProps = {
  href: string
  children: React.ReactNode
}

export type MobileMenuProps = {
  isMenuOpen: boolean
  toggleMenu: () => void
}

export type ButtonProps = {
  width: number
  height: number
}

// features
// map
export type MarkerLocation = {
  lat: number
  lng: number
  img: string
  link: string
}

export type AllMapsProps = {
  markerLocations: MarkerLocation[]
}

export type MarkerLocationProps = {
  markerLocation?: {
    lat: number
    lng: number
    img: string
  }
}

export type MapWidthHeightProps = {
  width?: number | string
  height?: number | string
}

export type MapProps = MarkerLocationProps & MapWidthHeightProps

// note
export type NoteProps = {
  photoId: number
  sutraId: number
  photoNote: string | null
  setEditNote: (value: boolean) => void
  rows: number
  cols: number
  is2XlOrBelow: boolean
}

//photo
export type CapturedImageProps = {
  capturedImageUrl: string | null
  width: number
  height: number
  borderRadius: string
}

export type DeletePhotoProps = {
  photoId: number
  is2XlOrBelow: boolean
}

export type EditPhotoProps = {
  setEditMode: (value: boolean) => void
  is2XlOrBelow: boolean
}

export type PhotoUploadAndPreviewProps = {
  sutraId: number
  photoId: number | null
  sutra: Sutra
}

export type Point = {
  x: number
  y: number
}

export type Area = {
  width: number
  height: number
  x: number
  y: number
}

// sutra
export type PhotosProps = {
  photos: Photo[]
}

export type SutraDetailsProps = {
  sutra: Sutra
  photo: Photo
  is2XlOrBelow: boolean
}

export type SutraListProps = {
  sutras: Sutra[]
  photos: Photo[]
}

export type SutraItemProps = {
  sutraId: number
  sutraKanji: string
  correspondingPhoto: Photo | undefined
  width: number
  height: number
}

export type SutraKanjiProps = {
  sutraKanji: string
  width: number
  height: number
}


// hooks
export type LocationProps = { lat: number; lng: number } | null

export type FetchLocationProps = { file: File | null }

// pages
export type MyPageProps = {
  user: User
  photos: Photo[]
}

// 共通
export type User = {
  id: number
  name: string
  email: string
  created_at: string
}

export type Sutra = { id: number; kanji: string }

export type Photo = {
  id: number
  note: string
  address: string
  longitude: number
  latitude: number
  image_url: string
  cropped_image_url: string
  created_at: string
  user_id: number
  sutra_id: number
}
