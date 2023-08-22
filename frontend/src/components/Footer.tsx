import Link from 'next/link'
import GitHubLink from '@/components/GitHubLink'
import TwitterLink from '@/components/TwitterLink'

const Footer = () => {
  return (
    <footer className='bg-tetsuguro font-notoSans text-white'>
      <div className='flex flex-col justify-center items-center md:py-4 py-2'>
        <nav className='space-x-4 mb-2 md:text-base text-xs'>
          <Link
            data-testid='terms-of-service'
            href='/terms-of-service'
            className='hover:opacity-50 transition-all duration-100'
          >
            利用規約
          </Link>
          <Link
            data-testid='privacy-policy'
            href='/privacy-policy'
            className='hover:opacity-50 transition-all duration-100'
          >
            プライバシーポリシー
          </Link>
        </nav>
        <nav className='flex flex-row space-x-4 mb-2'>
          <TwitterLink />
          <GitHubLink />
        </nav>
        <small className='md:text-base text-xs'>© 2023 shirotamaki</small>
      </div>
    </footer>
  )
}

export default Footer
