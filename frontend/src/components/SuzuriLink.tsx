import Image from 'next/image'
import Link from 'next/link'
import { ButtonProps } from '@/types/types'

const SuzuriLink = ({ width, height }: ButtonProps) => {
  return (
    <Link href='https://suzuri.jp/od_heart_sutra' legacyBehavior>
      <a target='_blank' rel='noopener noreferrer' data-testid='suzuri-link'>
        <div className='hover:opacity-50 transition-all duration-100'>
          <Image src='/images/suzuri_link.svg' alt={'Tshirt Icon'} width={width} height={height} />
        </div>
      </a>
    </Link>
  )
}

export default SuzuriLink
