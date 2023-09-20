import Menu from '@/components/Menu'
import Logout from '@/features/auth/Logout'

const DesktopMenu = () => (
  <div
    className='lg:text-base text-sm lg:space-x-8 space-x-6 flex-row'
    data-testid='desktop-menu-link'
  >
    <Menu href='/maps'>地図</Menu>
    <Menu href='/about'>説明</Menu>
    <Menu href='/how-to-use'>使い方</Menu>
    <Menu href='/mypage'>マイページ</Menu>
    <Logout />
  </div>
)

export default DesktopMenu
