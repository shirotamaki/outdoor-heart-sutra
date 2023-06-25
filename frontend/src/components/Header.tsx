import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import HomeButton from '@/components/HomeButton'
import Logout from '@/features/auth/Logout'

type MenuProps = {
  href: string
  children: React.ReactNode
}

type MobileMenuProps = {
  isMenuOpen: boolean
  toggleMenu: () => void
}

const Menu = ({ href, children }: MenuProps) => (
  <Link href={href} className='hover:opacity-50 transition-all duration-100'>
    {children}
  </Link>
)

const DesktopMenu = () => (
  <div className='space-x-8 flex-row mt-10'>
    <Menu href='/maps'>全体地図</Menu>
    <Menu href='/about'>説明</Menu>
    <Menu href='/mypage'>マイページ</Menu>
    <Logout />
  </div>
)

const MobileMenu = ({ isMenuOpen, toggleMenu }: MobileMenuProps) => {
  const menuAnimation = useSpring({
    transform: isMenuOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
    opacity: isMenuOpen ? 0.9 : 0,
  })

  return (
    <animated.div
      style={menuAnimation}
      className='absolute top-0 right-0 w-1/3 p-4 bg-white flex flex-col  justify-start space-y-4 z-10'
    >
      <button
        type='button'
        onClick={toggleMenu}
        className='ml-auto mt-2 hover:opacity-50 transition-all duration-100'
      >
        <Image src={`/images/xmark.png`} alt='Close Icon' width={36} height={36} />
      </button>
      <Menu href='/maps'>全体地図</Menu>
      <Menu href='/about'>説明</Menu>
      <Menu href='/mypage'>マイページ</Menu>
      <Logout />
    </animated.div>
  )
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className='bg-beige font-notoSans text-black/75 border-b border-white p-2'>
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
    </header>
  )
}

export default Header
