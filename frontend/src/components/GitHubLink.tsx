import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const GitHubLink = () => (
  <Link href='https://github.com/shirotamaki/outdoor-heart-sutra' legacyBehavior>
    <a
      target='_blank'
      rel='noopener noreferrer'
      className='hover:opacity-50 transition-all duration-100'
      data-testid='github-link'
      aria-label='GitHub Icon'
    >
      <FontAwesomeIcon
        icon={faGithub}
        style={{
          width: '18px',
          height: '18px',
        }}
      />
    </a>
  </Link>
)

export default GitHubLink
