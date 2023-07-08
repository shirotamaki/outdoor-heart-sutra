import Link from 'next/link'
import Logout from '@/features/auth/Logout'
import { MenuProps } from '@/types/types'

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

export default DesktopMenu
