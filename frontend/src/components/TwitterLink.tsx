import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const TwitterLink = () => (
  <Link
    href='https://twitter.com/od_heart_sutra'
    className='hover:opacity-50 transition-all duration-100'
    data-testid='twitter-link'
  >
    <FontAwesomeIcon icon={faXTwitter} size='lg' />
  </Link>
)

export default TwitterLink
