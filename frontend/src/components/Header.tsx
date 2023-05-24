import Link from 'next/link'
import HomeButton from '@/components/HomeButton'
import Logout from '@/features/auth/Logout'
import DeleteUser from '@/features/user/DeleteUser'

const Header = () => {
  return (
    <header>
      <div>
        <HomeButton />
      </div>
      <div>
        <Link href='/mypage'>マイページ</Link>
      </div>
      <div>
        <Link href='/about'>アウトドア般若心経とは</Link>
      </div>
      <div>
        <Link href='/maps'>全体地図</Link>
      </div>
      <div>
        <Logout />
      </div>
      <div>
        <DeleteUser />
      </div>
    </header>
  )
}

export default Header
