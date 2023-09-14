import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'
import DesktopMenu from '@/components/DesktopMenu'
import HomeButton from '@/components/HomeButton'
import MobileMenu from '@/components/MobileMenu'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  const insideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = insideRef.current

    if (!el) return

    const handleClickOutside = (e: MouseEvent) => {
      if (!el?.contains(e.target as Node)) {
        setIsMenuOpen(false)
      } else {
        return
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [insideRef])

  return (
    <header className='bg-beige font-reggae text-mainBlack border-b border-white py-3 px-4'>
      <div className='flex justify-between items-center 2xl:max-w-1352 lg:max-w-776 sm:max-w-552 max-w-screen-sm mx-auto'>
        <div className='hidden xl:flex' data-testid='homebutton-xl-link'>
          <HomeButton width={160} height={44.4} />
        </div>
        <div className='hidden sm:flex xl:hidden' data-testid='homebutton-md-link'>
          <HomeButton width={140} height={38.84} />
        </div>
        <div className='sm:hidden' data-testid='homebutton-sm-link'>
          <HomeButton width={120} height={33.3} />
        </div>

        {isAuthenticated && (
          <div ref={insideRef}>
            <div className='hidden sm:flex'>
              <DesktopMenu />
            </div>
            <div className='sm:hidden flex items-center'>
              <button
                type='button'
                onClick={toggleMenu}
                className='hover:opacity-50 transition-all duration-100'
              >
                <Image
                  data-testid='mobile-menu-button'
                  src={`/images/bars.png`}
                  alt='Menu Icon'
                  width={36}
                  height={36}
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
