import Image from 'next/image'
import Link from 'next/link'

const HomeButton = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-50'>
        <Image
          src='/images/logo_main.png'
          alt={'アウトドア般若心経のロゴ'}
          width={160}
          height={64}
        />
      </div>
    </Link>
  )
}

export default HomeButton
