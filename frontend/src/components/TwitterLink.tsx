import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const TwitterLink = () => (
  <Link href='https://twitter.com/od_heart_sutra' legacyBehavior>
    <a
      target='_blank'
      rel='noopener noreferrer'
      className='hover:opacity-50 transition-all duration-100'
      data-testid='twitter-link'
      aria-label='Twitter Icon'
    >
      <FontAwesomeIcon
        icon={faXTwitter}
        style={{
          width: '18px',
          height: '18px',
        }}
      />
    </a>
  </Link>
)

export default TwitterLink
