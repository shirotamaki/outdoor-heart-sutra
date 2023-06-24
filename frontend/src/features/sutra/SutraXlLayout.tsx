import Link from 'next/link'
import CapturedImage from '@/features/photo/CapturedImage'
import { Sutra, Photo } from '@/types/types'

const SutraXlLayout = ({ sutras, photos }: { sutras: Sutra[]; photos: Photo[] }) => {
  const firstLayout = sutras.slice(0, 279)

  return (
    <div>
      <div className='vertical-sutras-container flex justify-center'>
        {firstLayout.map((sutra) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <div key={sutra.id}>
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

export default SutraXlLayout