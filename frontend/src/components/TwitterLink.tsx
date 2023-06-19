import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const TwitterLink = () => (
  <Link
    href='https://twitter.com/od_heart_sutra'
    className='hover:opacity-50 transition-all duration-100'
  >
    <FontAwesomeIcon icon={faTwitter} size='lg' />
  </Link>
)

export default TwitterLink
