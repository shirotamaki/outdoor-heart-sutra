import Link from 'next/link'
import CapturedImage from '@/features/photo/CapturedImage'
import SutraCalculator from '@/features/sutra/SutraCalculator'
import { Sutra, Photo } from '@/types/types'

const SutraLgTo2XlLayout = ({ sutras, photos }: { sutras: Sutra[]; photos: Photo[] }) => {
  const firstLayout = sutras.slice(0, 140)
  const secondLayout = sutras.slice(140, 279)

  return (
    <div>
      <div className='font-reggae text-mainBlack flex justify-end mb-2'>
        <SutraCalculator photos={photos} />
      </div>
      <div className='vertical-sutras-container grid gap-2 grid-cols-14 mb-6'>
        {firstLayout.map((sutra) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <div data-testid='kanji' key={sutra.id} className='hover:opacity-70'>
              {correspondingPhoto && correspondingPhoto.cropped_image_url ? (
                <div>
                  <Link href={`/sutras/${sutra.id}`}>
                    <CapturedImage
                      capturedImageUrl={correspondingPhoto.cropped_image_url}
                      width={48}
                      height={48}
                      borderRadius='5px'
                    />
                  </Link>
                </div>
              ) : (
                <div className='text-5xl'>
                  <Link
                    href={`/sutras/${sutra.id}`}
                    className='text-sutraBlack no-underline font-kinuta'
                  >
                    {sutra.kanji}
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <br />

      <div className='vertical-sutras-container grid gap-2 grid-cols-14 mb-12'>
        {secondLayout.map((sutra) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <div key={sutra.id} className='hover:opacity-70'>
              {correspondingPhoto && correspondingPhoto.cropped_image_url ? (
                <div>
                  <Link href={`/sutras/${sutra.id}`}>
                    <CapturedImage
                      capturedImageUrl={correspondingPhoto.cropped_image_url}
                      width={48}
                      height={48}
                      borderRadius='5px'
                    />
                  </Link>
                </div>
              ) : (
                <div className='text-5xl'>
                  <Link
                    href={`/sutras/${sutra.id}`}
                    className='text-sutraBlack no-underline font-kinuta'
                  >
                    {sutra.kanji}
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SutraLgTo2XlLayout
