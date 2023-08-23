import Image from 'next/image'
import Link from 'next/link'
import { ButtonProps } from '@/types/types'

const HomeButton = ({ width, height }: ButtonProps) => {
  return (
    <Link href='/'>
      <div
        className='hover:opacity-75 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
        data-testid='homebutton-link'
      >
        <Image
          src='/images/logo.svg'
          alt={'アウトドア般若心経のロゴ'}
          width={width}
          height={height}
        />
      </div>
    </Link>
  )
}

export default HomeButton
