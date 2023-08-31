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

    if(!el) return

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
    <header className='bg-beige font-reggae text-originalBlack border-b border-white pt-2 px-2'>
      <div className='container mx-auto flex justify-between items-center '>
        <div className='hidden xl:flex' data-testid='homebutton-xl-link'>
          <HomeButton width={300} height={96} />
        </div>
        <div className='hidden md:flex xl:hidden' data-testid='homebutton-md-link'>
          <HomeButton width={240} height={72} />
        </div>
        <div className='flex md:hidden ml-2 mb-2' data-testid='homebutton-sm-link'>
          <HomeButton width={120} height={36} />
        </div>

        {isAuthenticated && (
          <div ref={insideRef}>
            <div className='hidden md:flex'>
              <DesktopMenu />
            </div>
            <div className='md:hidden'>
              <button
                type='button'
                onClick={toggleMenu}
                className='hover:opacity-50 transition-all duration-100 mt-1'
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
