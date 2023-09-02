import Link from 'next/link'
import GitHubLink from '@/components/GitHubLink'
import SuzuriLink from '@/components/SuzuriLink'
import TwitterLink from '@/components/TwitterLink'

const Footer = () => {
  return (
    <footer className='bg-tetsuguro font-notoSans text-white'>
      <div className='flex flex-col justify-center items-center md:py-8 py-4'>
        <nav className='space-x-4 md:mb-3 mb-2 md:text-base text-xs'>
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
        <nav className='flex flex-row space-x-4 items-center md:mb-3 mb-2'>
          <TwitterLink />
          <GitHubLink />
          <SuzuriLink width={18} height={18} />
        </nav>
        <small className='md:text-base text-xs'>© 2023 shirotamaki</small>
      </div>
    </footer>
  )
}

export default Footer
