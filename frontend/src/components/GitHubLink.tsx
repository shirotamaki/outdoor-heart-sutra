import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'

const GitHubLink = () => (
  <Link
    href='https://github.com/shirotamaki/outdoor-heart-sutra'
    className='hover:opacity-50 transition-all duration-100'
  >
    <FontAwesomeIcon icon={faGithub} size='lg' />
  </Link>
)

export default GitHubLink
