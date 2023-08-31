import Image from 'next/image'
import { useSpring, animated } from 'react-spring'
import Menu from '@/components/Menu'
import Logout from '@/features/auth/Logout'
import { MobileMenuProps } from '@/types/types'

const MobileMenu = ({ isMenuOpen, toggleMenu }: MobileMenuProps) => {
  const menuAnimation = useSpring({
    transform: isMenuOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
    opacity: isMenuOpen ? 0.9 : 0,
  })

  return (
    <animated.div
      style={menuAnimation}
      className={`absolute top-0 right-0 w-1/2 pt-2 pb-4 pr-2 pl-4 bg-white flex flex-col  justify-start space-y-8 z-10 ${
        isMenuOpen ? '' : 'hidden'
      }`}
      data-testid='mobile-menu-link'
    >
      <button
        type='button'
        onClick={toggleMenu}
        className='ml-auto hover:opacity-50 transition-all duration-100'
      >
        <Image
          src={`/images/xmark.png`}
          alt='Close Icon'
          width={64}
          height={64}
          className='ml-24'
        />
      </button>
      <Menu href='/maps'>全体地図</Menu>
      <Menu href='/about'>説明</Menu>
      <Menu href='/mypage'>マイページ</Menu>
      <Logout />
      <br />
    </animated.div>
  )
}

export default MobileMenu
