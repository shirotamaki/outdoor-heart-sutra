import Image from 'next/image'
import Link from 'next/link'

const HomeButton = () => {
  return (
    <Link href='/'>
      <div>
        <Image
          src='/images/sample_home_button.png' // 仮の画像
          alt={'アウトドア般若心経のロゴ'}
          width={48}
          height={48}
        />
      </div>
    </Link>
  )
}

export default HomeButton
