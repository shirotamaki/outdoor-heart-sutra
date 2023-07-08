import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import DesktopMenu from '@/components/DesktopMenu'
import HomeButton from '@/components/HomeButton'
import MobileMenu from '@/components/MobileMenu'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <header className='bg-beige font-reggae text-black/50 border-b border-white pt-4 px-2'>
      <div className='container mx-auto flex justify-between items-center '>
        <div className='hidden xl:flex'>
          <HomeButton width={300} height={96} />
        </div>
        <div className='hidden md:flex xl:hidden'>
          <HomeButton width={240} height={72} />
        </div>
        <div className='flex md:hidden'>
          <HomeButton width={160} height={48} />
        </div>

        {isAuthenticated && (
          <div>
            <div className='hidden md:flex'>
              <DesktopMenu />
            </div>
            <div className='md:hidden'>
              <button
                type='button'
                onClick={toggleMenu}
                className='hover:opacity-50 transition-all duration-100'
              >
                <Image
                  src={`/images/bars.png`}
                  alt='Menu Icon'
                  width={36}
                  height={36}
                  className='mt-4'
                />
              </button>
              <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
