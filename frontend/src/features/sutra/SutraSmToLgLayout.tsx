import SutraCalculator from '@/features/sutra/SutraCalculator'
import SutraItem from '@/features/sutra/SutraItem'
import { Sutra, Photo } from '@/types/types'

const SutraSmToLgLayout = ({ sutras, photos }: { sutras: Sutra[]; photos: Photo[] }) => {
  const firstLayout = sutras.slice(0, 100)
  const secondLayout = sutras.slice(100, 200)
  const thirdLayout = sutras.slice(200, 279)

  return (
    <div>
      <div className='font-reggae text-mainBlack flex justify-end mb-2'>
        <SutraCalculator photos={photos} />
      </div>
      <div className='vertical-sutras-container grid gap-2 grid-cols-10 mb-6'>
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

      <br />

      <div className='vertical-sutras-container grid gap-2 grid-cols-10 mb-6'>
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

      <br />

      <div className='vertical-sutras-container grid gap-2 grid-cols-10 mb-12'>
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
    </div>
  )
}

export default SutraSmToLgLayout
