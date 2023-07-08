import Image from 'next/image'
import Link from 'next/link'
import { HomeButtonProps } from '@/types/types'

const HomeButton = ({ width, height }: HomeButtonProps) => {
  return (
    <Link href='/' data-testid='homebutton-link'>
      <div className='hover:opacity-75 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
        <Image
          src='/images/logo_main.png'
          alt={'アウトドア般若心経のロゴ'}
          width={width}
          height={height}
        />
      </div>
    </Link>
  )
}

export default HomeButton
