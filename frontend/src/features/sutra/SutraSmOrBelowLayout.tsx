import SutraCalculator from '@/features/sutra/SutraCalculator'
import SutraItem from '@/features/sutra/SutraItem'
import { Sutra, Photo } from '@/types/types'

const SutraSmOrBelowLayout = ({ sutras, photos }: { sutras: Sutra[]; photos: Photo[] }) => {
  const firstLayout = sutras.slice(0, 60)
  const secondLayout = sutras.slice(60, 120)
  const thirdLayout = sutras.slice(120, 180)
  const fourthLayout = sutras.slice(180, 240)
  const fifthLayout = sutras.slice(240, 279)

  return (
    <div>
      <div className='font-reggae text-mainBlack flex justify-end mb-2'>
        <SutraCalculator photos={photos} />
      </div>
      <div className='vertical-sutras-container grid gap-2 grid-cols-6 mb-12'>
        {firstLayout.map((sutra, index) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <SutraItem
              key={index}
              sutraId={sutra.id}
              sutraKanji={sutra.kanji}
              correspondingPhoto={correspondingPhoto}
              width={48}
              height={48}
            />
          )
        })}
      </div>
      <div className='vertical-sutras-container grid gap-2 grid-cols-6 mb-12'>
        {secondLayout.map((sutra, index) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <SutraItem
              key={index}
              sutraId={sutra.id}
              sutraKanji={sutra.kanji}
              correspondingPhoto={correspondingPhoto}
              width={48}
              height={48}
            />
          )
        })}
      </div>
      <div className='vertical-sutras-container grid gap-2 grid-cols-6 mb-12'>
        {thirdLayout.map((sutra, index) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <SutraItem
              key={index}
              sutraId={sutra.id}
              sutraKanji={sutra.kanji}
              correspondingPhoto={correspondingPhoto}
              width={48}
              height={48}
            />
          )
        })}
      </div>
      <div className='vertical-sutras-container grid gap-2 grid-cols-6 mb-12'>
        {fourthLayout.map((sutra, index) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <SutraItem
              key={index}
              sutraId={sutra.id}
              sutraKanji={sutra.kanji}
              correspondingPhoto={correspondingPhoto}
              width={48}
              height={48}
            />
          )
        })}
      </div>
      <div className='vertical-sutras-container grid gap-2 grid-cols-6 mb-12'>
        {fifthLayout.map((sutra, index) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <SutraItem
              key={index}
              sutraId={sutra.id}
              sutraKanji={sutra.kanji}
              correspondingPhoto={correspondingPhoto}
              width={48}
              height={48}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SutraSmOrBelowLayout
