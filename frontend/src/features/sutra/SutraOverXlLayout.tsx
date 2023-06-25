import Link from 'next/link'
import CapturedImage from '@/features/photo/CapturedImage'
import { Sutra, Photo } from '@/types/types'

const SutraOverXlLayout = ({ sutras, photos }: { sutras: Sutra[]; photos: Photo[] }) => {
  const firstLayout = sutras.slice(0, 279)

  return (
    <div>
      <div className='vertical-sutras-over-xl-container flex justify-center'>
        {firstLayout.map((sutra) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <div key={sutra.id} className='hover:opacity-70'>
              {correspondingPhoto && correspondingPhoto.cropped_image_url ? (
                <div>
                  <Link href={`/sutras/${sutra.id}`}>
                    <CapturedImage
                      capturedImageUrl={correspondingPhoto.cropped_image_url}
                      width={60}
                      height={60}
                      borderRadius='5px'
                    />
                  </Link>
                </div>
              ) : (
                <div className='text-6xl'>
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

export default SutraOverXlLayout
