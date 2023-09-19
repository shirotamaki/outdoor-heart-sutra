import SutraCalculator from '@/features/sutra/SutraCalculator'
import SutraItem from '@/features/sutra/SutraItem'
import { Sutra, Photo } from '@/types/types'

const SutraLgTo2XlLayout = ({ sutras, photos }: { sutras: Sutra[]; photos: Photo[] }) => {
  const firstLayout = sutras.slice(0, 140)
  const secondLayout = sutras.slice(140, 279)

  const photoMap: { [key: number]: Photo } = Object.fromEntries(
    photos.map((photo) => [photo.sutra_id, photo]),
  )

  return (
    <div>
      <div className='font-reggae text-mainBlack flex justify-end mb-2'>
        <SutraCalculator photos={photos} />
      </div>
      <div className='vertical-sutras-container grid gap-2 grid-cols-14 mb-12'>
        {renderSutraLayout(firstLayout, photoMap)}
      </div>
      <div className='vertical-sutras-container grid gap-2 grid-cols-14 mb-12'>
        {renderSutraLayout(secondLayout, photoMap)}
      </div>
    </div>
  )
}

const renderSutraLayout = (sutraLayout: Sutra[], photoMap: { [key: number]: Photo }) => {
  return sutraLayout.map((sutra) => {
    const correspondingPhoto = photoMap[sutra.id]

    return (
      <SutraItem
        key={sutra.id}
        sutraId={sutra.id}
        sutraKanji={sutra.kanji}
        correspondingPhoto={correspondingPhoto}
        width={48}
        height={48}
      />
    )
  })
}

export default SutraLgTo2XlLayout
