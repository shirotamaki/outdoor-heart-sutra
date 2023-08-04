import Link from 'next/link'
import CapturedImage from '@/features/photo/CapturedImage'
import { Sutra, Photo } from '@/types/types'

const SutraMdLayout = ({ sutras, photos }: { sutras: Sutra[]; photos: Photo[] }) => {
  const firstLayout = sutras.slice(0, 100)
  const secondLayout = sutras.slice(100, 200)
  const thirdLayout = sutras.slice(200, 279)

  return (
    <div>
      <div className='vertical-sutras-container flex justify-center'>
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
                    className='text-black/25 no-underline font-kinuta'
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

      <div className='vertical-sutras-container flex justify-center'>
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
                    className='text-black/25 no-underline font-kinuta'
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

      <div className='vertical-sutras-container flex justify-center'>
        {thirdLayout.map((sutra) => {
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
                    className='text-black/25 no-underline font-kinuta'
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

export default SutraMdLayout
