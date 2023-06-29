import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import HomeButton from '@/components/HomeButton'
import Logout from '@/features/auth/Logout'
import { MenuProps, MobileMenuProps } from '@/types/types'

const Menu = ({ href, children }: MenuProps) => (
  <Link href={href} className='hover:opacity-50 transition-all duration-100'>
    {children}
  </Link>
)

const DesktopMenu = () => (
  <div className='text-base xl:text-xl space-x-8 flex-row mt-8'>
    <Menu href='/maps'>全体地図</Menu>
    <Menu href='/about'>説明</Menu>
    <Menu href='/mypage'>マイページ</Menu>
    <Logout />
  </div>
)

const MobileMenu = ({ isMenuOpen, toggleMenu }: MobileMenuProps) => {
  const menuAnimation = useSpring({
    transform: isMenuOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
    opacity: isMenuOpen ? 0.9 : 0,
  })

  return (
    <animated.div
      style={menuAnimation}
      className={`absolute top-0 right-0 w-1/2 p-4 bg-white flex flex-col  justify-start space-y-8 z-10 ${
        isMenuOpen ? '' : 'hidden'
      }`}
    >
      <button
        type='button'
        onClick={toggleMenu}
        className='ml-auto mt-2 hover:opacity-50 transition-all duration-100'
      >
        <Image src={`/images/xmark.png`} alt='Close Icon' width={42} height={42} />
      </button>
      <Menu href='/maps'>全体地図</Menu>
      <Menu href='/about'>説明</Menu>
      <Menu href='/mypage'>マイページ</Menu>
      <Logout />
      <br />
    </animated.div>
  )
}

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
