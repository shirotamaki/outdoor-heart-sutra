import SutraCalculator from '@/features/sutra/SutraCalculator'
import SutraItem from '@/features/sutra/SutraItem'
import { Sutra, Photo } from '@/types/types'

const SutraOver2XlLayout = ({ sutras, photos }: { sutras: Sutra[]; photos: Photo[] }) => {
  const firstLayout = sutras.slice(0, 279)

  const photoMap: { [key: number]: Photo } = Object.fromEntries(
    photos.map((photo) => [photo.sutra_id, photo]),
  )

  return (
    <div>
      <div className='font-reggae text-mainBlack flex justify-end mb-2'>
        <SutraCalculator photos={photos} />
      </div>
      <div className='vertical-sutras-over-xl-container grid gap-2 grid-cols-14 mb-8'>
        {renderSutraLayout(firstLayout, photoMap)}
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

export default SutraOver2XlLayout
