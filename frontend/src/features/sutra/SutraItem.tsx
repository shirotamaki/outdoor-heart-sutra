import Image from 'next/image'
import Link from 'next/link'
import CapturedImage from '@/features/photo/CapturedImage'
import { SutraItemProps } from '@/types/types'

const SutraItem = ({ sutraId, sutraKanji, correspondingPhoto, width, height }: SutraItemProps) => {
  const replaceMapping: { [key: string]: string } = {
    罣: '/images/kanji_kei.svg',
    埵: '/images/kanji_ta.svg',
  }

  return (
    <div data-testid='kanji' key={sutraId} className='hover:opacity-50'>
      {correspondingPhoto && correspondingPhoto.cropped_image_url ? (
        <div className='mt-1'>
          <Link href={`/sutras/${sutraId}`}>
            <CapturedImage
              capturedImageUrl={correspondingPhoto.cropped_image_url}
              width={width}
              height={height}
              borderRadius='5px'
            />
          </Link>
        </div>
      ) : (
        <div className='text-5xl 2xl:text-6xl'>
          <Link href={`/sutras/${sutraId}`} className='text-sutraBlack no-underline font-kinuta'>
            {replaceMapping[sutraKanji] ? (
              <Image
                src={replaceMapping[sutraKanji]}
                alt={sutraKanji}
                width={width}
                height={height}
                className='opacity-25 pt-1'
              />
            ) : (
              sutraKanji
            )}
          </Link>
        </div>
      )}
    </div>
  )
}

export default SutraItem
