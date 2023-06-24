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
  <div className='space-x-8 flex-row'>
    <Menu href='/maps'>全体地図</Menu>
    <Menu href='/about'>説明</Menu>
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
      className='absolute top-0 right-0 w-1/4 p-2 bg-white flex flex-col  justify-start space-y-4 z-10'
    >
      <button
        type='button'
        onClick={toggleMenu}
        className='hover:opacity-50 transition-all duration-100'
      >
        <Image src={`/images/xmark.png`} alt='Close Icon' width={36} height={36} />
      </button>

      <Menu href='/maps'>全体地図</Menu>
      <Menu href='/about'>説明</Menu>
      <Logout />
    </animated.div>
  )
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className='bg-white font-notoSans p-2'>
      <div className='container mx-auto flex justify-between items-center px-8'>
        <HomeButton />

        <div className='hidden md:flex'>
          <DesktopMenu />
        </div>

        <div className='md:hidden'>
          <button
            type='button'
            onClick={toggleMenu}
            className='hover:opacity-50 transition-all duration-100'
          >
            <Image src={`/images/bars.png`} alt='Menu Icon' width={36} height={36} />
          </button>
          <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>
    </header>
  )
}

export default Header
