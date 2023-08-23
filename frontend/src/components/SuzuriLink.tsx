import Image from 'next/image'
import Link from 'next/link'
import { ButtonProps } from '@/types/types'

const SuzuriLink = ({ width, height }: ButtonProps) => {
  return (
    <Link href='https://suzuri.jp/od_heart_sutra' data-testid='suzuri-link'>
      <div className='hover:opacity-50 transition-all duration-100 mt-1'>
        <Image src='/images/suzuri_link.svg' alt={'Tシャツのロゴ'} width={width} height={height} />
      </div>
    </Link>
  )
}

export default SuzuriLink
