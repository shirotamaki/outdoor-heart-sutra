import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import HomeButton from '@/components/HomeButton'
import Logout from '@/features/auth/Logout'
import DeleteUser from '@/features/user/DeleteUser'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='flex justify-between w-full bg-red-500'>
      <HomeButton />
      <div className=''>
        <nav>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='cursor-pointer'>
            <button>
              <Image
                src={`/images/${isMenuOpen ? 'xmark-solid' : 'bars-solid'}.svg`}
                alt='Menu Icon'
                width={48}
                height={48}
              />
            </button>
          </div>
          <ul className={`${isMenuOpen ? '' : 'hidden'}`}>
            <li>
              <Link href='/mypage'>マイページ</Link>
            </li>
            <li className=''>
              <Link href='/about'>アウトドア般若心経とは</Link>
            </li>
            <li className=''>
              <Link href='/maps'>全体地図</Link>
            </li>
            <li className=''>
              <Logout />
            </li>
            <li className=''>
              <DeleteUser />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
