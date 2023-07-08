import Menu from '@/components/Menu'
import Logout from '@/features/auth/Logout'

const DesktopMenu = () => (
  <div className='text-base xl:text-xl space-x-8 flex-row mt-8'>
    <Menu href='/maps'>全体地図</Menu>
    <Menu href='/about'>説明</Menu>
    <Menu href='/mypage'>マイページ</Menu>
    <Logout />
  </div>
)

export default DesktopMenu
