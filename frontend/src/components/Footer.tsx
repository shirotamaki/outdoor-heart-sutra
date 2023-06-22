import Link from 'next/link'
import GitHubLink from '@/components/GitHubLink'
import TwitterLink from '@/components/TwitterLink'
import DeleteUser from '@/features/user/DeleteUser'

const Footer = () => {
  return (
    <footer className='flex flex-col justify-center items-center bg-beige font-notoSans py-4'>
      <div className='flex justify-center items-center space-x-4 mb-4'>
        <Link href='/terms-of-service' className='hover:opacity-50 transition-all duration-100'>
          利用規約
        </Link>
        <Link href='/privacy-policy' className='hover:opacity-50 transition-all duration-100'>
          プライバシーポリシー
        </Link>
        <Link href='/delete-account' className='hover:opacity-50 transition-all duration-100'>
          退会
        </Link>
      </div>
      <div className='flex justify-center items-center space-x-4 mb-4'>
        <TwitterLink />
        <GitHubLink />
      </div>
      <div className='flex justify-center items-center space-x-4 mb-4'>© 2023 shirotamaki</div>
    </footer>
  )
}

export default Footer
