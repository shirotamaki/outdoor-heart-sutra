import Image from 'next/image'
import { SutraKanjiProps } from '@/types/types'

const SutraItem = ({ sutraKanji, width, height }: SutraKanjiProps) => {
  const replaceMapping: { [key: string]: string } = {
    罣: '/images/kanji_kei.svg',
    埵: '/images/kanji_ta.svg',
  }

  return (
    <div>
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
    </div>
  )
}

export default SutraItem
